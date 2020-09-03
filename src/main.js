import Vue from 'vue'
import App from './App.vue'
// 在main.js引入就称为全局引入
// @相当于/src目录
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
