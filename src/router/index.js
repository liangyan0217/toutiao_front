// 引入路由封装模块
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用VueRouter来管理当前项目的路由
Vue.use(VueRouter)
// 引入组件
import Login from '@/views/login'
import Register from '@/views/register'
import User from '@/views/user/user.vue'
import editUser from '@/views/user/editUser.vue'
import Index from '@/views/index'
import Newdetail from '@/views/newdetail'
import CommentList from '@/views/commentList'
import Follow from '@/views/myfollow'
import Star from '@/views/mystar'
import CateList from '@/views/cateList'
import myComment from '@/views/myComment'
const router = new VueRouter({
  routes: [
    // 添加具体的路由配置，实现路由映射组件
    // 路由默认重定向
    {
      name: 'default',
      path: '/',
      redirect: {name:'index'}
    },
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
    },
    {
      name: 'editUser',
      path: '/editUser/:id',
      component: editUser
    },
    {
      name: 'index',
      path: '/index',
      // meta:{
      //   keepAlive:true
      // },
      component: Index
    },
    {
      name: 'newdetail',
      path: '/newdetail/:id',
      component: Newdetail
    },
    {
      name: 'commentList',
      path: '/commentList/:id',
      component: CommentList
    },
    {
      name: 'follow',
      path: '/follow',
      component: Follow
    },
    {
      name: 'star',
      path: '/star',
      component: Star
    },
    {
      name: 'cateList',
      path: '/cateList',
      component: CateList
    },
    {
      name: 'mycomment',
      path: '/mycomment',
      component: myComment
    }
  ]
})

// 添加导航守卫
// next()类似于中间件，每个路由跳转都经过这步
router.beforeEach((to, from, next) => {
  // console.log(123);
  // console.log(to);
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