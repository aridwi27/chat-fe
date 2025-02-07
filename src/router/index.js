import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import login from '../views/login.vue'
import register from '../views/register.vue'
import users from '../views/detailuser.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { auth: true }
  },
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/sigup',
    name: 'register',
    component: register
  },
  {
    path: '/users/:id',
    name: 'users',
    component: users,
    meta: { auth: true }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched[0].meta.auth === true) {
    if (store.getters['auth/getToken']) {
      next()
    } else {
      alert('you dont have access')
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})

export default router
