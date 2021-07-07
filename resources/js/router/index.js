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
import ShowProduct from '../pages/product/show'

//Authentication Route List
import Login from '../pages/auth/login'
import Signup from '../pages/auth/register'

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
            meta: { requiresAuth: true }
        }, {
            path: '/category/create',
            component: CreateCategory,
            name: 'create-category',
            meta: { requiresAuth: true }
        }, {
            path: '/category/edit/:slug',
            component: EditCategory,
            name: 'edit-category',
            meta: { requiresAuth: true }
        }, {
            path: '/product',
            component: ProductList,
            name: 'product-list',
            meta: { requiresAuth: true }
        }, {
            path: '/product/create',
            component: CreateProduct,
            name: 'create-product',
            meta: { requiresAuth: true }
        }, {
            path: '/product/edit/:slug',
            component: EditProduct,
            name: 'edit-product',
            meta: { requiresAuth: true }
        }, {
            path: '/product/show/:slug',
            component: ShowProduct,
            name: 'show-product',
            meta: { requiresAuth: true }
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
        } ,{
            path: '/auth/login',
            component: Login,
            name: 'login',
            meta:{ requiresVisitor: true }
        }, {
            path: '/auth/signup',
            component: Signup,
            name: 'signup',
            meta:{ requiresVisitor: true }
        },
    ]
});

export default routes;
