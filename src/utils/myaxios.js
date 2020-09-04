import axios from 'axios'
import {Toast} from 'vant'
axios.defaults.baseURL="http://localhost:3000"

// 添加请求拦截器
// 添加请求拦截器，在请求发送之前一定要经过这个拦截器，我们在这里可以进行相应的处理
// 拦截器只能对请求进行拦截及处理，并不会代替你发起请求
axios.interceptors.request.use(function (config) {
  console.log(config);
  // 在发送请求之前做些什么
  let token = localStorage.getItem('token')
  if(token){
    config.headers.Authorization=token
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  console.log(response);
  if(response.data.message==="用户信息验证失败"){
    Toast.fail('用户信息验证失败');
    // this.$router.push({name:'login'})
    window.location.href="#/login"
  }
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

// const myaxios = axios.create({
//   baseURL:"http://localhost:3000"
// })
export default axios