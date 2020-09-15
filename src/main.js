import Vue from 'vue'
import App from './App.vue'
// 引入路由模块
import router from '@/router/index'
// 在main.js引入就称为全局引入
// @相当于/src目录
import Css from '@/styles/reset.less'
// import 'vant/lib/index.css';
import { Toast,Uploader,Dialog,Field,Picker,Icon,Tab,Tabs,List,PullRefresh,Search } from 'vant';
Vue.use(Toast)
    .use(Uploader)
    .use(Dialog)
    .use(Field)
    .use(Picker)
    .use(Icon)
    .use(Tab)
    .use(Tabs)
    .use(List)
    .use(PullRefresh)
    .use(Search)
Vue.config.productionTip = false

new Vue({
  // 注入路由
  router,
  render: h => h(App),
}).$mount('#app')