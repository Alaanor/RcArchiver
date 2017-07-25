import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: require('@/components/Home')
    },
    {
      path: '/about',
      name: 'About',
      component: require('@/components/About')
    }
  ],
  linkActiveClass: 'md-primary',
  mode: 'history',
  base: __dirname
})
