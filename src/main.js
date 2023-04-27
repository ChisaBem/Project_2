import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { registerPlugins } from '@/plugins'


import Toast, { POSITION } from "vue-toastification";

import "vue-toastification/dist/index.css";


import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const app = createApp(App)

app.use(Toast, {
    // Setting the global default position
    position: POSITION.BOTTOM_RIGHT
});
app.component('VueDatePicker', VueDatePicker);
app.use(router)

registerPlugins(app)

app.mount('#app')
