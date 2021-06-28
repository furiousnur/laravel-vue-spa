import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '../pages/home'
import CategoryList from '../pages/category/index'
import CreateCategory from '../pages/category/create'
import EditCategory from '../pages/category/edit'

import ProductList from '../pages/product/index'
import CreateProduct from '../pages/product/create'
import EditProduct from '../pages/product/edit'

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
        }, {
            path: '/product',
            component: ProductList,
            name: 'product-list',
        }, {
            path: '/product/create',
            component: CreateProduct,
            name: 'create-product',
        }, {
            path: '/product/edit/:slug',
            component: EditProduct,
            name: 'edit-product',
        }
    ]
});

export default routes;
