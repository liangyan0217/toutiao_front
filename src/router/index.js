// 引入路由封装模块
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用VueRouter来管理当前项目的路由
Vue.use(VueRouter)
// 引入组件
import Login from '@/views/login'
import Register from '@/views/register'
import User from '@/views/user/user.vue'

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
      path: '/user/:id',
      component: User
    }
  ]
})

// 添加导航守卫
router.beforeEach((to, from, next) => {
  console.log(123);
  console.log(to);
  if(to.name==='user'){
    if(localStorage.getItem('token')){
      next()
    }else{
      next({path:'/login'})
    }
  }else{
    // 如果不是访问需要授权的页面，则不需要判断是否登陆
    next()
  }
  
})
// 暴露路由
export default router