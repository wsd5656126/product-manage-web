// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import ErrorPage from './pages/ErrorPage'

Vue.config.productionTip = false
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: App,
    name: 'App',
    children: [
      {
        path: 'error',
        component: ErrorPage,
        name: 'ErrorPage'
      }
    ]
  }
]
const vueRouter = new VueRouter({
  mode: 'history',
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: vueRouter,
  components: { App },
  template: '<App/>'
})
