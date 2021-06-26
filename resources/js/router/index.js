import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '../pages/home'
import CategoryList from '../pages/category/index'

const routes = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home,
            name: 'home',
        }, {
            path: '/category',
            component: CategoryList,
            name: 'category-list',
        }
    ]
});

export default routes;
