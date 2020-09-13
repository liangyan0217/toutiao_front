<template>
  <div class="comment">
    <myedit title="我的关注">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      <van-icon name="wap-home-o" size="25" slot="right" @click="$router.push({name:'index'})" />
    </myedit>
    <div class="commentItem" v-for="value in myCommentList" :key="value.id">
      <div class="answer">
        <div class="time">1029-9-9 10:09</div>
        <div class="sour" v-if="value.parent">
          <p>回复：{{value.parent.user.nickname}}</p>
          <div v-if="value.parent">{{value.parent.content}}</div>
        </div>
        <div class="myanswer">{{value.content}}</div>
        <div
          class="content"
        >原文：{{value.post.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import myedit from "@/components/myedit";
import {userComments} from '../apis/user'
export default {
  data(){
    return{
      myCommentList:[]
    }
  },
  components: {
    myedit,
  },
  async mounted () {
    let res = await userComments()
    console.log(res);
    this.myCommentList=res.data.data

  }
};
</script>

<style lang='less' scoped>
.commentItem {
  padding: 10px;
  > .source {
    > .time {
      color: #999;
      font-size: 13px;
    }
    padding: 15px 0;
    border-bottom: 1px solid #ccc;
    .title {
      font-size: 14px;
      padding: 20px 0;
    }
    .content {
      font-size: 12px;
      color: #999;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  > .answer {
    padding: 15px 0;
    border-bottom: 1px solid #ccc;
    > .time {
      color: #999;
      font-size: 13px;
      line-height: 30px;
    }
    .sour {
      background-color: #eee;
      padding: 10px;
      color: #999;
      line-height: 25px;
      > p {
        font-size: 12px;
      }
      > div {
        font-size: 13px;
      }
    }
    .myanswer {
      font-weight: bold;
      line-height: 40px;
    }
    .content {
      font-size: 12px;
      color: #999;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
