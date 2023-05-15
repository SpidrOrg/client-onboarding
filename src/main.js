/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';
import idpConfig from '@/idpConfig-local';

// Plugins
import { registerPlugins } from '@/plugins';

import './index.css';

const app = createApp(App, { idpConfig });

registerPlugins(app);

app.mount('#app');
