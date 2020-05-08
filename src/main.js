import Vue from 'vue'
import App from './App.vue'
import router from "./router.js"
import Common from './components/Common.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

// 增加全局变量，用于页面跳转时，存储上下文内容
Vue.prototype.Common = Common;

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,  // 注入到根实例中
  render: h => h(App),
}).$mount('#app')
