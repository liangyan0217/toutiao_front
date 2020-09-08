import myaxios from '@/utils/myaxios'
// 文章列表
// 接口类型:【GET】
// 接口地址:/post
export const articleList =function(params){
  return myaxios({
    url:'/post',
    params
  })
}