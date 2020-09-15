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
export const postComment =(id,params)=>{
  return myaxios({
    url:`/post_comment/${id}`,
    params
  })
}

// 收藏文章列表
// 接口类型:【GET】
// 需要验证:【Authorization 】
// 接口地址: /post_star/:id
export const postStar = (id)=>{
  return myaxios({
    url:`/post_star/${id}`
  })
}

// 发布评论
// 接口类型:【POST】
// 需要验证:【Authorization 】
// 接口地址: /post_comment/:id
export const sendPostComment =(id,data)=>{
  return myaxios({
    method:'post',
    url:`/post_comment/${id}`,
    data
  })
}

// 搜索文章
// 接口类型:【GET】
// 接口地址: /post_search
export const postSearch = (keyword)=>{
  return myaxios({
    url:'/post_search',
    params:{keyword}
  })
}