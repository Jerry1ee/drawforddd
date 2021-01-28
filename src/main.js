import Vue from 'vue'
import App from './App.vue'

//导入全局样式表
import './assets/css/global.css'

import router from './router'
import './plugins/element.js'

import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8081'
// 修改axios 的content type
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

import * as R from 'ramda'
Vue.prototype.R = R

Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
