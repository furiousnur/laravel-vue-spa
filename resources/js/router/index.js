import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Home from '../pages/home'
//Category Route List
import CategoryList from '../pages/category/index'
import CreateCategory from '../pages/category/create'
import EditCategory from '../pages/category/edit'

//Product Route List
import ProductList from '../pages/product/index'
import CreateProduct from '../pages/product/create'
import EditProduct from '../pages/product/edit'

//Authentication Route List
import Login from '../pages/auth/login'

//Dashboard Route List
import Dashboard from '../pages/dashboard/index'
import Profile from '../pages/dashboard/profile'

const routes = new VueRouter({
    mode: 'history',
    linkExactActiveClass: 'active',
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
        }, {
            path: '/auth/login',
            component: Login,
            name: 'login',
            meta:{ requiresVisitor: true }
        }, {
            path: '/dashboard',
            component: Dashboard,
            name: 'dashboard',
            meta: { requiresAuth: true }
        }, {
            path: '/dashboard/profile',
            component: Profile,
            name: 'profile',
            meta: { requiresAuth: true }
        }
    ]
});

export default routes;
