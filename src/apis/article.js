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

// 文章详情
// 接口类型:【GET】
// 接口地址: /post/:id
export const newdDetail = function(id){
  return myaxios({
    url:`/post/${id}`
  })
}

// 评论列表
// 接口类型:【GET】
// 接口地址: /post_comment/:id
export const postComment =(id)=>{
  return myaxios({
    url:`/post_comment/${id}`
  })
}