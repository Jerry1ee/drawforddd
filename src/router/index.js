import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/login.vue'
import Home from '../views/home.vue'
import Draw from '../views/draw.vue'
import Example from '../views/example.vue'



Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  { path: '/', component: Home},
  { path: '/draw', component:Draw},
  { path: '/example', component: Example}

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
