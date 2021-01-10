import Vue from 'vue'
import App from './App.vue'

//导入全局样式表
import './assets/css/global.css'

import router from './router'
import './plugins/element.js'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
