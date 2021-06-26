import Vue from 'vue'
import routes from './router/index'

require('./bootstrap');

// window.Vue = require('vue').default;
// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('app-header', require('./components/Header.vue').default);

const app = new Vue({
    el: '#app',
    router: routes,
});
