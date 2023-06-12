import { createApp } from 'vue';
// Temporary solution -> Error: Cannot find module 'vue3-click-away' or its corresponding type declarations.
// @ts-ignore
import VueClickAway from 'vue3-click-away';

import App from './App.vue';
import './assets/main.css';

import './index.css';

if (import.meta.env.VITE_BRAND === 'EXPLORER') {
  import('configs-brand-explorer/index.css');
} else {
  import('configs-brand-rg/index.css');
}

const app = createApp(App);

app.use(VueClickAway);
app.mount('#app');
