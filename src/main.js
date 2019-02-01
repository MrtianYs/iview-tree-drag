import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Iview from 'iview'
import 'iview/dist/styles/iview.css'

import bookStatus from './components/bookStatus'

Vue.component('bookStatus', bookStatus);

Vue.use(Iview);

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
