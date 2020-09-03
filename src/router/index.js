import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 引入组件
import Login from '@/views/login'
const router = new VueRouter({
  routes:[
    // 添加具体的路由配置，实现路由映射组件
    {
      name:'login',
      path:'/login',
      component:Login
    }
  ]
})
// 暴露路由
export default router