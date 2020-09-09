import myaxios from '@/utils/myaxios'

// 登录
// 接口类型:【POST】
// 接口地址: '/login'
export const login =function(data){
  // axios方法返回的是一个promise对象，用户接收之后可以then和catch
  return myaxios({
    method:'post',
    url:'/login',
    data
  })
}

// 用户详情
// 接口类型:【GET】
// 需要验证:【Authorization 】
// 接口地址:/user/:id 
export const user =function(id){
  // 创建axios实例对象
  return myaxios({
    url:`/user/${id}`,
    headers: { Authorization: localStorage.getItem('token')}
  })
}

// 编辑用户信息
// 接口类型:【POST】
// 需要验证:【Authorization 】
// 接口地址: /user_update/:id
export const userUpdate =function(id,data){
  return myaxios({
    method:'post',
    url:`/user_update/${id}`,
    data
  })
}
// 注册
// 接口类型:【POST】
// 接口地址: /register
export const register = function(data){
  return myaxios({
    method:'post',
    url:'/register',
    data
  })
}

// 关注用户
// 接口类型:【GET】
// 需要验证:【Authorization 】
// 接口地址: /user_follows/:id
export const userFollows =function(id){
  return myaxios({
    url:`/user_follows/${id}`,
  })
}

// 取消关注用户
// 接口类型:【GET】
// 需要验证:【Authorization 】
// 接口地址: /user_unfollow/:id
export const userUnfollow =(id)=>{
  return myaxios({
    url:`/user_unfollow/${id}`,
  })
}

// 点赞文章
// 接口类型:【GET】
// 需要验证:【Authorization 】
// 接口地址: /post_like/:id
export const postLike =(id)=>{
  return myaxios({
    url:`/post_like/${id}`
  })
}