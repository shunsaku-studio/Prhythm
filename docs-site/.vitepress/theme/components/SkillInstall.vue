<script setup lang="ts">
import { computed, ref } from 'vue';
import { useData } from 'vitepress';

const REPO = 'shunsaku-studio/Prhythm';

type AgentId = 'copilot' | 'cursor' | 'claude-code';

const agents: { id: AgentId; label: string }[] = [
  { id: 'claude-code', label: 'Claude Code' },
  { id: 'cursor', label: 'Cursor' },
  { id: 'copilot', label: 'Copilot' },
];

const { frontmatter } = useData();
const activeAgent = ref<AgentId>('claude-code');
const copied = ref(false);

const skill = computed(() => frontmatter.value.skill as string | undefined);
const title = computed(() => (frontmatter.value.title as string | undefined) ?? skill.value ?? '');

const command = computed(() => {
  const name = skill.value;
  if (!name) return '';

  const base = `gh skill install ${REPO} ${name}`;
  if (activeAgent.value === 'copilot') return base;

  return `${base} --agent ${activeAgent.value} --scope user`;
});

const selectAgent = (id: AgentId) => {
  activeAgent.value = id;
  copied.value = false;
};

const copy = async () => {
  if (!command.value) return;
  await navigator.clipboard.writeText(command.value);
  copied.value = true;
  window.setTimeout(() => {
    copied.value = false;
  }, 2000);
};
</script>

<template>
  <header v-if="skill" class="skill-page">
    <h1 class="skill-page-title">{{ title }}</h1>

    <div class="skill-install" aria-label="インストール">
      <p class="skill-install-label">インストール</p>

      <div class="skill-install-tabs">
        <div class="skill-install-tabs-list" role="tablist" aria-label="エージェント">
          <button
            v-for="agent in agents"
            :id="`skill-install-tab-${agent.id}`"
            :key="agent.id"
            type="button"
            role="tab"
            class="skill-install-tab"
            :class="{ 'is-active': activeAgent === agent.id }"
            :aria-selected="activeAgent === agent.id"
            :aria-controls="`skill-install-panel-${agent.id}`"
            @click="selectAgent(agent.id)"
          >
            {{ agent.label }}
          </button>
        </div>

        <div
          :id="`skill-install-panel-${activeAgent}`"
          role="tabpanel"
          class="skill-install-panel"
          :aria-labelledby="`skill-install-tab-${activeAgent}`"
        >
          <div class="skill-install-command">
            <pre class="skill-install-command-text"><code>{{ command }}</code></pre>
            <button
              type="button"
              class="skill-install-copy"
              :aria-label="copied ? 'コピーしました' : 'コマンドをコピー'"
              @click="copy"
            >
              <svg
                v-if="copied"
                class="skill-install-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <svg
                v-else
                class="skill-install-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
