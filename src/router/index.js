import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'
import { applyMetaTitleSimple } from './metaguards'
import Home from '@pages/Home.vue'
import Playground from '@pages/Playground.vue'

// todo: meta.title not work - fix this
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { title: store.state.appName },
  },
  {
    path: '/testycool',
    name: 'playground',
    component: Playground,
    meta: { title: 'Playground a.k.a. the test page' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: function (to, from, savedPosition) {
    // console.log(to, from, savedPosition)
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    } else {
      return { el: '#app' }
    }
  },
  routes,
})

// Insert meta.title to the page title
router.beforeEach((to, from, next) => {
  applyMetaTitleSimple(to, from, next)
})

export default router
