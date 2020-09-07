import myaxios from '@/utils/myaxios'

// 文件上传
// 接口类型:【POST】
// 需要验证:【Authorization 】
// 接口地址: /upload
export const upload = function(data){
  return myaxios({
    method:'post',
    url:'/upload',
    data
  })
}