import myaxios from '@/utils/myaxios'
// 栏目列表
// 接口类型:【GET】
// 验证:【Authorization 】
// /category
export const categoryList=function(){
  return myaxios({
    url:'/category',
  })
}