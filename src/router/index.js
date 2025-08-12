import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MakingString from '../views/MakingString.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: {
      HomeView,
      MakingString,
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/making-string',
    name: 'makingString',
    component: MakingString
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
