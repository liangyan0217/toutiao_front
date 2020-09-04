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
  return myaxios({
    url:`/user/${id}`,
    headers: { Authorization: localStorage.getItem('token')}
  })
}