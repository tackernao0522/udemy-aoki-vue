import Vue from 'vue'
import VueRouter from 'vue-router'
import BookIndex from '../pages/BookIndex.vue'
import BookSearch from '../pages/BookSearch.vue'
import BookEdit from '../pages/BookEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'BookIndex',
    component: BookIndex
  },
  {
    path: '/search',
    name: 'BookSearch',
    component: BookSearch
  },
  {
    path: '/edit/:id',
    name: 'BookEdit',
    component: BookEdit
  },
  {
    path: '*',
    redirect: '/',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
