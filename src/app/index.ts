import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import '@/shared/assets/css/style.css';
import '@/shared/assets/fonts/avenir/stylesheet.css';
import '@/shared/assets/css/normalize.css';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

app.use(router);
app.mount('#app');
