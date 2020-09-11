<template>
  <div>
    <div class="single" v-if="post.type==1&&post.cover.length<=2">
      <div class="left" @click="$router.push({path:`/newdetail/${post.id}`})">
        <p class="content">{{post.title}}</p>
        <p class="info">
          <span>{{post.user.nickname}}</span>
          <span v-if="post.comment_length || post.comment_length===0">{{post.comment_length}}跟帖</span>
          <span v-if="post.comments">{{post.comments.length}}跟帖</span>
        </p>
      </div>
      <img :src="post.cover[0].url" alt />
    </div>
    <div class="single" v-else-if="post.type==2" @click="$router.push({path:`/newdetail/${post.id}`})">
      <div class="content">{{post.title}}</div>
      <div class="video">
        <img :src="post.cover[0].url" alt/>
        <van-icon name="play-circle-o" />
      </div>
      <div class="info">
        <span>{{post.user.nickname}}</span>
        <span v-if="post.comment_length || post.comment_length===0">{{post.comment_length}}跟帖</span>
        <span v-if="post.comments">{{post.comments.length}}跟帖</span>
      </div>
    </div>
    <div class="single" v-else-if="post.type==1&&post.cover.length<=3" @click="$router.push({path:`/newdetail/${post.id}`})">
      <div class="content">{{post.title}}</div>
      <div class="imgs">
        <img :src="post.cover[index].url" v-for="(value,index) in post.cover" :key="index" alt />
      </div>
      <div class="info">
        <span>{{post.user.nickname}}</span>
        <span v-if="post.comment_length || post.comment_length===0">{{post.comment_length}}跟帖</span>
        <span v-if="post.comments">{{post.comments.length}}跟帖</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  mounted () {
    console.log(this.post.comments);
    console.log(this.post.comment_length);
    // console.log(this.post.comment_length);
  }
};
</script>

<style lang='less' scoped>
body {
  overflow-x: hidden;
  overflow-y: hidden;
}
.content {
  font-size: 14px;
  padding: 0px 5px;
  line-height: 24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.single {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
  }
  .info {
    font-size: 12px;
    padding-left: 5px;
    color: #999;
    > span:nth-of-type(1) {
      padding-right: 15px;
    }
  }
  img {
    width: 120/360 * 100vw;
    height: 70/360 * 100vw;
    object-fit: cover;
    padding-right: 5px;
  }
  .imgs {
    display: flex;
    padding: 10px 0;
    > img {
      flex: 1;
      padding: 0 5px;
      box-sizing: border-box;
      display: block;
    }
  }
  .video {
    position: relative;
    width: 100%;
    height: 170/360 * 100vw;
    padding: 10px;
    box-sizing: border-box;
    > img {
      width: 100%;
      height: 100%;
    }
    >.van-icon{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      color: #fff;
      font-size: 40px;
    }
  }
}
</style>
