import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '../pages/home'
import CategoryList from '../pages/category/index'
import CreateCategory from '../pages/category/create'
import EditCategory from '../pages/category/edit'

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
        }, {
            path: '/category/create',
            component: CreateCategory,
            name: 'create-category',
        }, {
            path: '/category/edit/:slug',
            component: EditCategory,
            name: 'edit-category',
        }
    ]
});

export default routes;
