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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/making-string',
    name: 'making-string',
    component: MakingString
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
