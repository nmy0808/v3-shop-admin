import { setupGlobal } from '@/global/'
import scui from './scui'
import i18n from './locales'
import router from './router'
import store from './store'
import { createApp } from 'vue'
import App from './App.vue'
import 'windi.css'
import findKey from 'lodash/findKey'

const app = createApp(App);

app.use(store);
app.use(router);
app.use(setupGlobal)
app.use(i18n);
app.use(scui);

//挂载app
app.mount('#app');
