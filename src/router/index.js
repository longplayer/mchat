import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'
import { applyMetaTitleSimple } from './metaguards'
import Home from '@pages/Home.vue'

const baseURL = import.meta.env.BASE_URL
const routes = [
  {
    path: baseURL,
    name: 'home',
    component: Home,
    meta: { title: store.state.appName },
  },
]

const router = createRouter({
  base: baseURL,
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
