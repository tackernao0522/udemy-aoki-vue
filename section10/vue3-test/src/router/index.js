import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Children from '@/views/Children'
import TeleportTest from '@/views/TeleportTest'
import CompositionTest from '@/views/CompositionTest'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/children',
    name: 'Children',
    component: Children
  },
  {
    path: '/teleport-test',
    name: 'TeleportTest',
    component: TeleportTest
  },
  {
    path: '/composition-test',
    name: 'CompositionTest',
    component: CompositionTest
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
