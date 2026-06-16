import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import SkillInstall from './components/SkillInstall.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('SkillInstall', SkillInstall);
  },
} satisfies Theme;
