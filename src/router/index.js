// 引入路由封装模块
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用VueRouter来管理当前项目的路由
Vue.use(VueRouter)
// 引入组件
import Login from '@/views/login'
import Register from '@/views/register'
import User from '@/views/user.vue'

const router = new VueRouter({
  routes: [
    // 添加具体的路由配置，实现路由映射组件
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'register',
      path: '/register',
      component: Register
    },
    {
      name: 'user',
      path: '/user',
      component: User
    }
  ]
})
// 暴露路由
export default router