// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import Login from './pages/Login'
import Home from './pages/Home'
import Product from './pages/product/Product'
import ProductList from './pages/product/ProductList'
import ProductEdit from './pages/product/ProductEdit'
import Service from './pages/service/Service'
import {getGlobalData} from './utils/globalData'

Vue.config.productionTip = false
Vue.use(ElementUi)
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    component: App,
    name: 'App',
    children: [
      {
        path: 'login',
        component: Login,
        name: 'Login'
      },
      {
        path: 'home',
        component: Home,
        name: 'Home',
        children: [
          {
            path: 'service',
            component: Service,
            name: 'Service'
          },
          {
            path: 'log',
            component: ProductList,
            name: 'Log'
          },
          {
            path: 'product',
            component: Product,
            name: 'Product',
            children: [
              {
                path: 'list',
                component: ProductList,
                name: 'ProductList'
              },
              {
                path: 'add/0',
                component: ProductEdit,
                name: 'ProductAdd'
              },
              {
                path: 'edit/:id',
                component: ProductEdit,
                name: 'ProductEdit'
              }
            ]
          }
        ]
      },
    ]
  },
]

let router = new VueRouter({
  mode: 'history',
  routes: routes
})
router.beforeEach((to, from, next) => {
  // if (to.name !== "Login") {
  //   if (!getGlobalData('username')) {
  //     next({name: "Login"})
  //   }
  // }
  //正常情况
  next();
})

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router: router,
  components: {App},
  template: '<App/>'
})
