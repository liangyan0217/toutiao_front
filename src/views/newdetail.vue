<template>
  <div class="articaldetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new" @click="$router.push({name:'index'})"></span>
      </div>
      <span :class="article.has_follow?'active':''" @click="articleFollow">{{article.has_follow?'已关注':'关注'}}</span>
    </div>
    <div class="detail">
      <div class="title">{{article.title}}</div>
      <div class="desc">
        <span>{{article.nickname}}</span> &nbsp;&nbsp;
        <span>2019-9-9</span>
      </div>
      <div class="content" v-if="article.type==1||(article.type==2&&article.id==8)" v-html="article.content">
      </div>
      <div class="content" v-if="article.type==2">
        <video :src="article.content" autoplay muted controls></video>
      </div>
      <div class="opt">
        <span class="like" :class="article.has_like?'active':''" @click="articleLike">
          <van-icon name="good-job-o" />{{article.like_length}}
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item" v-for="(value,index) in commentList" :key="index">
        <div class="head">
          <img :src="baseURL+commentList[index].user.head_img" alt />
          <div>
            <p>{{commentList[index].nickname}}</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">{{commentList[index].content}}</div>
      </div>
      <div class="more" @click="$router.push({path:`/commentList/${$route.params.id}`})">更多跟帖</div>
    </div>
    <div class="footer">
      <myCommentFooter @click="collectArticle" :post="article"></myCommentFooter>
    </div>
  </div>
</template>

<script>
import { newdDetail,postComment,postStar } from "@/apis/article";
import { userFollows,userUnfollow,postLike } from "@/apis/user";
import myCommentFooter from "@/components/myCommentFooter";
export default {
  components: {
    myCommentFooter
  },
  data(){
    return{
      article:{},
      commentList:{},
      baseURL:''
    }
  },
  async mounted () {
    // 根据id获取文章的详情，实现文章详情的动态渲染
    let result = await newdDetail(this.$route.params.id)
      console.log(result);
      this.article=result.data.data
    // 获取评论列表
    let res = await postComment(this.$route.params.id)
    console.log(res);
    this.commentList=res.data.data
    this.baseURL=res.config.baseURL
  },
  methods: {
    // 用户关注与取消关注
    async articleFollow(){
      let result
      if(this.article.has_follow){
        // 取关
        result = await userUnfollow(this.article.user.id)
      }else{
        // 关注
        result = await userFollows(this.article.user.id)
      }
      this.article.has_follow = !this.article.has_follow
      this.$toast.success(result.data.message)
    },
    // 点赞
    async articleLike(){
      let result = await postLike(this.$route.params.id)
      console.log(result);
      if(!this.article.has_like){
        ++ this.article.like_length;
      }else{
        -- this.article.like_length;
      }
      this.$toast.success(result.data.message)
      this.article.has_like = !this.article.has_like
    },
    // 收藏文章
    async collectArticle(){
      let res = await postStar(this.article.id)
      console.log(res);
      this.$toast.success(res.data.message)
      this.article.has_star = !this.article.has_star
    }
  }
}
</script>

<style lang='less' scoped>
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    border: 1px solid #ccc;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
    &.active{
      background-color: #f00;
      color: #fff;
    }
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
    /deep/ img {
        width: 100%;
        display: block;
    }
    >video {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      // height: 100%;
      /* object-fit: fill; */
    }
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    &.active{
      border: 1px solid #f00;
      color: #f00;
    }
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
</style>
