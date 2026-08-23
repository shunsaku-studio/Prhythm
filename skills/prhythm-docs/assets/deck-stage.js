/**
 * <deck-stage> — prhythm-docs slide viewer (lightweight).
 *
 * Slides are the direct element children of <deck-stage>. They render into a
 * fixed design-size canvas (default 1920x1080) that is scaled with
 * `transform: scale()` to fit the viewport and letterboxed. Because every
 * slide is authored at a known pixel size, "does this content overflow?" has
 * a deterministic answer — see the ?debug mode below and lint-deck.mjs.
 *
 *   <deck-stage width="1920" height="1080">
 *     <section class="slide s-cover">…</section>
 *   </deck-stage>
 *
 * Navigation: ← → Space PageUp PageDown Home End, digits 1-9 (0 = slide 10),
 * and clicking the left/right half of the stage.
 *
 * Print: `@page` is sized to the design size and each slide becomes its own
 * page, so Print → Save as PDF gives one slide per page with no setup.
 *
 * ?debug in the URL outlines any slide whose content exceeds the canvas and
 * writes the measured overflow into the slide's `data-overflow` attribute.
 */
(() => {
  const DESIGN_W = 1920;
  const DESIGN_H = 1080;
  const OVERLAY_HIDE_MS = 1800;
  const DEBUG = /[?&]debug\b/.test(location.search);

  const stylesheet = `
    :host {
      position: fixed;
      inset: 0;
      display: block;
      background: #0a0a0a;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
    }
    /* Held until webfonts settle so the first paint has the real typography;
       the deck is heading-weight-dependent and a FOUT is very visible. */
    :host([data-fonts-pending]) .stage { opacity: 0; }

    .stage { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
    .canvas { position: relative; transform-origin: center center; flex-shrink: 0; background: #fff; will-change: transform; }

    /* Slides stay in light DOM via <slot> so the deck's authored CSS applies.
       Each slotted child is absolutely positioned so they stack. */
    ::slotted(*) {
      position: absolute !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      box-sizing: border-box !important;
      overflow: hidden;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }
    ::slotted([data-deck-active]) { opacity: 1; visibility: visible; pointer-events: auto; }
    ::slotted([data-overflow]) { outline: 6px solid #d92d20; outline-offset: -6px; }

    .overlay {
      position: fixed;
      left: 50%;
      bottom: 20px;
      transform: translate(-50%, 6px);
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 7px 14px;
      background: #0a0a0a;
      color: #fff;
      border-radius: 999px;
      font: 500 12px/1 ui-monospace, "SF Mono", Menlo, monospace;
      letter-spacing: 0.06em;
      font-variant-numeric: tabular-nums;
      opacity: 0;
      pointer-events: none;
      transition: opacity 240ms ease, transform 240ms cubic-bezier(.2,.8,.2,1);
      z-index: 10;
      user-select: none;
    }
    .overlay[data-visible] { opacity: 1; transform: translate(-50%, 0); }
    .overlay .total { color: rgba(255,255,255,.5); }
    .overlay .hint { color: rgba(255,255,255,.5); }

    @media print {
      :host { position: static; inset: auto; background: none; overflow: visible; }
      .stage { position: static; display: block; }
      .canvas { transform: none !important; width: auto !important; height: auto !important; background: none; }
      ::slotted(*) {
        position: relative !important;
        inset: auto !important;
        width: var(--deck-w) !important;
        height: var(--deck-h) !important;
        opacity: 1 !important;
        visibility: visible !important;
        break-after: page;
        break-inside: avoid;
      }
      ::slotted(*:last-child) { break-after: auto; }
      .overlay { display: none !important; }
    }
  `;

  class DeckStage extends HTMLElement {
    static get observedAttributes() {
      return ['width', 'height'];
    }

    constructor() {
      super();
      this._root = this.attachShadow({ mode: 'open' });
      this._index = 0;
      this._slides = [];
      this._hideTimer = null;
      this._onKey = this._onKey.bind(this);
      this._onResize = this._onResize.bind(this);
      this._onSlotChange = this._onSlotChange.bind(this);
      this._onPointerMove = this._onPointerMove.bind(this);
      this._onClick = this._onClick.bind(this);
    }

    get designWidth() {
      return parseInt(this.getAttribute('width'), 10) || DESIGN_W;
    }
    get designHeight() {
      return parseInt(this.getAttribute('height'), 10) || DESIGN_H;
    }

    connectedCallback() {
      this._render();
      this._syncPrintPageRule();
      window.addEventListener('keydown', this._onKey);
      window.addEventListener('resize', this._onResize);
      window.addEventListener('pointermove', this._onPointerMove, { passive: true });
      this.addEventListener('click', this._onClick);
      // Print lays every slide out as its own page, so entrance styles gated
      // on [data-deck-active] need the attribute everywhere or they print at
      // their hidden base state.
      this._onBeforePrint = () => this._slides.forEach((s) => s.setAttribute('data-deck-active', ''));
      this._onAfterPrint = () => this._apply(false);
      window.addEventListener('beforeprint', this._onBeforePrint);
      window.addEventListener('afterprint', this._onAfterPrint);

      this.setAttribute('data-fonts-pending', '');
      const reveal = () => {
        this.removeAttribute('data-fonts-pending');
        this._checkOverflow();
      };
      // rAF first: document.fonts.ready is already resolved until layout has
      // pushed the slotted text's FontFaces into 'loading'.
      requestAnimationFrame(() => {
        Promise.race([
          document.fonts ? document.fonts.ready : Promise.resolve(),
          new Promise((r) => setTimeout(r, 2000)),
        ]).then(reveal, reveal);
      });
    }

    disconnectedCallback() {
      window.removeEventListener('keydown', this._onKey);
      window.removeEventListener('resize', this._onResize);
      window.removeEventListener('pointermove', this._onPointerMove);
      window.removeEventListener('beforeprint', this._onBeforePrint);
      window.removeEventListener('afterprint', this._onAfterPrint);
      this.removeEventListener('click', this._onClick);
      if (this._hideTimer) clearTimeout(this._hideTimer);
    }

    attributeChangedCallback() {
      if (!this._canvas) return;
      this._sizeCanvas();
      this._fit();
      this._syncPrintPageRule();
    }

    _render() {
      const style = document.createElement('style');
      style.textContent = stylesheet;

      const stage = document.createElement('div');
      stage.className = 'stage';
      const canvas = document.createElement('div');
      canvas.className = 'canvas';
      const slot = document.createElement('slot');
      slot.addEventListener('slotchange', this._onSlotChange);
      canvas.appendChild(slot);
      stage.appendChild(canvas);

      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      overlay.innerHTML =
        '<span><span class="current">1</span> / <span class="total">1</span></span>' +
        '<span class="hint">\u2190 \u2192</span>';

      this._root.append(style, stage, overlay);
      this._canvas = canvas;
      this._stage = stage;
      this._slot = slot;
      this._overlay = overlay;
      this._currentEl = overlay.querySelector('.current');
      this._totalEl = overlay.querySelector('.total');
      this._sizeCanvas();
    }

    _sizeCanvas() {
      const w = this.designWidth;
      const h = this.designHeight;
      this._canvas.style.width = w + 'px';
      this._canvas.style.height = h + 'px';
      this._canvas.style.setProperty('--deck-w', w + 'px');
      this._canvas.style.setProperty('--deck-h', h + 'px');
    }

    /** @page is a no-op inside shadow DOM, so it lives in a <head> tag. */
    _syncPrintPageRule() {
      const id = 'deck-stage-print-page';
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
        document.head.appendChild(tag);
      }
      tag.textContent =
        `@page { size: ${this.designWidth}px ${this.designHeight}px; margin: 0; }` +
        '@media print {' +
        'html, body { margin: 0 !important; padding: 0 !important; background: none !important; height: auto !important; overflow: visible !important; }' +
        '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; }' +
        '*, *::before, *::after { transition-duration: 0s !important; animation-duration: .001s !important; animation-delay: -99s !important; animation-fill-mode: both !important; }' +
        '}';
    }

    _onSlotChange() {
      this._slides = this._slot
        .assignedElements({ flatten: true })
        .filter((el) => !/^(TEMPLATE|SCRIPT|STYLE)$/.test(el.tagName));
      this._slides.forEach((s, i) => {
        s.setAttribute('data-deck-slide', String(i));
        if (!s.hasAttribute('data-label')) {
          const h = s.querySelector('h1, h2');
          if (h) s.setAttribute('data-label', (h.textContent || '').trim().slice(0, 40));
        }
      });
      this._totalEl.textContent = String(this._slides.length || 1);
      if (this._index >= this._slides.length) this._index = Math.max(0, this._slides.length - 1);
      this._restoreIndex();
      this._apply(false);
      this._fit();
      this._checkOverflow();
    }

    _restoreIndex() {
      const m = (location.hash || '').match(/^#(\d+)$/);
      if (!m) return;
      const n = parseInt(m[1], 10) - 1;
      if (n >= 0 && n < this._slides.length) this._index = n;
    }

    _apply(flash = true) {
      if (!this._slides.length) return;
      this._slides.forEach((s, i) => {
        if (i === this._index) s.setAttribute('data-deck-active', '');
        else s.removeAttribute('data-deck-active');
      });
      this._currentEl.textContent = String(this._index + 1);
      try {
        history.replaceState(null, '', '#' + (this._index + 1));
      } catch (e) {}
      this.dispatchEvent(
        new CustomEvent('slidechange', {
          detail: { index: this._index, total: this._slides.length, slide: this._slides[this._index] },
          bubbles: true,
          composed: true,
        }),
      );
      if (flash) this._flash();
    }

    _flash() {
      this._overlay.setAttribute('data-visible', '');
      if (this._hideTimer) clearTimeout(this._hideTimer);
      this._hideTimer = setTimeout(() => this._overlay.removeAttribute('data-visible'), OVERLAY_HIDE_MS);
    }

    _fit() {
      if (!this._canvas) return;
      const s = Math.min(window.innerWidth / this.designWidth, window.innerHeight / this.designHeight);
      this._canvas.style.transform = `scale(${s})`;
    }

    _onResize() {
      this._fit();
    }

    _onPointerMove() {
      this._flash();
    }

    _onClick(e) {
      if (e.target.closest && e.target.closest('a[href], button, input, select, textarea, [contenteditable]')) return;
      this._go(this._index + (e.clientX > window.innerWidth / 2 ? 1 : -1));
    }

    _onKey(e) {
      const t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      let handled = true;
      if (k === 'ArrowRight' || k === 'PageDown' || k === ' ') this._go(this._index + 1);
      else if (k === 'ArrowLeft' || k === 'PageUp') this._go(this._index - 1);
      else if (k === 'Home') this._go(0);
      else if (k === 'End') this._go(this._slides.length - 1);
      else if (/^[0-9]$/.test(k)) this._go(k === '0' ? 9 : parseInt(k, 10) - 1);
      else handled = false;
      if (handled) {
        e.preventDefault();
        this._flash();
      }
    }

    _go(i) {
      if (!this._slides.length) return;
      const n = Math.max(0, Math.min(this._slides.length - 1, i));
      if (n === this._index) {
        this._flash();
        return;
      }
      this._index = n;
      this._apply();
    }

    /** Slides are overflow:hidden at a fixed size, so scrollHeight/Width past
     *  the canvas means content is being silently clipped. Measuring needs
     *  every slide laid out, so this temporarily un-hides them. */
    _checkOverflow() {
      if (!DEBUG || !this._slides.length) return;
      const w = this.designWidth;
      const h = this.designHeight;
      const report = [];
      this._slides.forEach((s, i) => {
        const prev = s.style.visibility;
        s.style.visibility = 'visible';
        const dy = s.scrollHeight - h;
        const dx = s.scrollWidth - w;
        s.style.visibility = prev;
        if (dy > 1 || dx > 1) {
          s.setAttribute('data-overflow', `${Math.max(0, dx)}x${Math.max(0, dy)}`);
          report.push(`  #${i + 1} ${s.getAttribute('data-label') || ''} — +${Math.max(0, dx)}px w / +${Math.max(0, dy)}px h`);
        } else {
          s.removeAttribute('data-overflow');
        }
      });
      if (report.length) console.warn('[deck-stage] overflowing slides:\n' + report.join('\n'));
    }

    get index() {
      return this._index;
    }
    get length() {
      return this._slides.length;
    }
    goTo(i) {
      this._go(i);
    }
    next() {
      this._go(this._index + 1);
    }
    prev() {
      this._go(this._index - 1);
    }
  }

  if (!customElements.get('deck-stage')) customElements.define('deck-stage', DeckStage);
})();
