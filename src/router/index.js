import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/login.vue'
import Home from '../views/home.vue'
import Draw from '../views/draw.vue'



Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  { path: '/', component: Home},
  { path: '/draw', component:Draw},

]

const router = new VueRouter({
  routes
})

export default router
