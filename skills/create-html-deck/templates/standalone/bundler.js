document.addEventListener('DOMContentLoaded', async () => {
  const loading = document.getElementById('__bundler_loading');
  function setStatus(msg) {
    if (loading) loading.textContent = msg;
  }

  // Error sink persists across replaceWith since it's on window, not the DOM.
  window.addEventListener(
    'error',
    (e) => {
      var p = document.body || document.documentElement;
      var d =
        document.getElementById('__bundler_err') ||
        p.appendChild(document.createElement('div'));
      d.id = '__bundler_err';
      d.style.cssText =
        'position:fixed;bottom:12px;left:12px;right:12px;font:12px/1.4 ui-monospace,monospace;background:#2a1215;color:#ff8a80;padding:10px 14px;border-radius:8px;border:1px solid #5c2b2e;z-index:99999;white-space:pre-wrap;max-height:40vh;overflow:auto';
      d.textContent =
        (d.textContent ? d.textContent + String.fromCharCode(10) : '') +
        '[bundle] ' +
        (e.message || e.type) +
        (e.filename
          ? ' (' + e.filename.slice(0, 60) + ':' + e.lineno + ')'
          : '');
    },
    true,
  );

  try {
    const manifestEl = document.querySelector(
      'script[type="__bundler/manifest"]',
    );
    const templateEl = document.querySelector(
      'script[type="__bundler/template"]',
    );
    if (!manifestEl || !templateEl) {
      setStatus('Error: missing bundle data');
      console.error(
        '[bundler] Missing script tags — manifestEl:',
        !!manifestEl,
        'templateEl:',
        !!templateEl,
      );
      return;
    }

    const manifest = JSON.parse(manifestEl.textContent);
    let template = JSON.parse(templateEl.textContent);

    const uuids = Object.keys(manifest);
    setStatus('Unpacking ' + uuids.length + ' assets...');

    const blobUrls = {};
    await Promise.all(
      uuids.map(async (uuid) => {
        const entry = manifest[uuid];
        try {
          const binaryStr = atob(entry.data);
          const bytes = new Uint8Array(binaryStr.length);
          for (let i = 0; i < binaryStr.length; i++)
            bytes[i] = binaryStr.charCodeAt(i);

          let finalBytes = bytes;
          if (entry.compressed) {
            if (typeof DecompressionStream !== 'undefined') {
              const ds = new DecompressionStream('gzip');
              const writer = ds.writable.getWriter();
              const reader = ds.readable.getReader();
              writer.write(bytes);
              writer.close();
              const chunks = [];
              let totalLen = 0;
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                chunks.push(value);
                totalLen += value.length;
              }
              finalBytes = new Uint8Array(totalLen);
              let offset = 0;
              for (const chunk of chunks) {
                finalBytes.set(chunk, offset);
                offset += chunk.length;
              }
            } else {
              console.warn(
                'DecompressionStream not available, asset ' +
                  uuid +
                  ' may not render',
              );
            }
          }

          blobUrls[uuid] = URL.createObjectURL(
            new Blob([finalBytes], { type: entry.mime }),
          );
        } catch (err) {
          console.error('Failed to decode asset ' + uuid + ':', err);
          blobUrls[uuid] = URL.createObjectURL(
            new Blob([], { type: entry.mime }),
          );
        }
      }),
    );

    const extResEl = document.querySelector(
      'script[type="__bundler/ext_resources"]',
    );
    const extResources = extResEl ? JSON.parse(extResEl.textContent) : [];
    const resourceMap = {};
    for (const entry of extResources) {
      if (blobUrls[entry.uuid]) resourceMap[entry.id] = blobUrls[entry.uuid];
    }

    setStatus('Rendering...');
    for (const uuid of uuids)
      template = template.split(uuid).join(blobUrls[uuid]);

    // Strip integrity + crossorigin — blob URLs from a file:// document inherit
    // a null origin, so crossorigin forces a CORS fetch that SRI then rejects.
    // The manifest bytes are ours; SRI protects against CDN compromise, not this.
    template = template
      .replace(/\s+integrity="[^"]*"/gi, '')
      .replace(/\s+crossorigin="[^"]*"/gi, '');

    const resourceScript =
      '<script>window.__resources = ' +
      JSON.stringify(resourceMap)
        .split('</' + 'script>')
        .join('<\\/' + 'script>') +
      ';</' +
      'script>';
    // Inject after <head> so the DOCTYPE stays first; prepending the script
    // would push the parser into quirks mode. DOMParser always emits a <head>
    // (synthesizing one if the source HTML omitted it) but may carry
    // attributes through, so match the full opening tag. slice() rather than
    // replace() keeps us clear of $-pattern substitution in resourceScript.
    const headOpen = template.match(/<head[^>]*>/i);
    if (headOpen) {
      const i = headOpen.index + headOpen[0].length;
      template = template.slice(0, i) + resourceScript + template.slice(i);
    }

    // Parse the template and swap the root element. Scripts inserted via
    // DOMParser/replaceWith are inert per spec — re-create each with
    // createElement so they execute, awaiting onload for src scripts to
    // preserve ordering (React before ReactDOM before Babel before text/babel).
    const doc = new DOMParser().parseFromString(template, 'text/html');
    document.documentElement.replaceWith(doc.documentElement);
    const dead = Array.from(document.scripts);
    for (const old of dead) {
      const s = document.createElement('script');
      for (const a of old.attributes) s.setAttribute(a.name, a.value);
      s.textContent = old.textContent;
      // text/babel scripts with a src: fetch and inline. transformScriptTags
      // does XHR against the src, but blob:null/ from a file:// origin is
      // silently dropped. Inlining makes it a plain inline babel script,
      // which transformScriptTags handles unconditionally.
      if ((s.type === 'text/babel' || s.type === 'text/jsx') && s.src) {
        const r = await fetch(s.src);
        s.textContent = await r.text();
        s.removeAttribute('src');
      }
      const p = s.src
        ? new Promise((r) => {
            s.onload = s.onerror = r;
          })
        : null;
      old.replaceWith(s);
      if (p) await p;
    }
    // Babel standalone auto-transforms type=text/babel on DOMContentLoaded,
    // which fired before we swapped the document. Trigger manually if present.
    if (
      window.Babel &&
      typeof window.Babel.transformScriptTags === 'function'
    ) {
      window.Babel.transformScriptTags();
    }
  } catch (err) {
    setStatus('Error unpacking: ' + err.message);
    console.error('Bundle unpack error:', err);
  }
});
