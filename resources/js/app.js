import Vue from 'vue'
import routes from './router/index'
require('./bootstrap');
import CxltToastr from 'cxlt-vue2-toastr'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'

var toastrConfigs = {
    position: 'top right',
    showDuration: 4000,
    timeout: 4000,
    closeButton: true,
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut'
}
Vue.use(CxltToastr, toastrConfigs)


// window.Vue = require('vue').default;
// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('app-header', require('./components/Header.vue').default);

const app = new Vue({
    el: '#app',
    router: routes,
});
