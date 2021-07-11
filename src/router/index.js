import { createRouter, createWebHistory } from 'vue-router'
import Home from '@pages/Home.vue'
import Playground from '@pages/Playground.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/testycool',
    name: 'playground',
    component: Playground,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
