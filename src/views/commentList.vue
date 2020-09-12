<template>
  <div class="comments">
    <myedit title="精彩评论">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      <van-icon name="wap-home-o" size="25" slot="right" @click="$router.push({name:'index'})" />
    </myedit>
    <div class="lists">
      <div class="item" v-for="value in commentItem" :key="value.id">
        <div class="head">
          <img :src="value.user.head_img" alt />
          <div>
            <p>{{value.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <myCommentList :parent="value.parent" v-if="value.parent"></myCommentList>
        <div class="text">{{value.content}}</div>
      </div>
    </div>
    <myCommentFooter :post="articleDetail" @click="handlerclick"></myCommentFooter>
  </div>
</template>

<script>
import { postComment, newdDetail, sendPostComment } from "@/apis/article";
import myedit from "@/components/myedit";
import myCommentFooter from "@/components/myCommentFooter";
import myCommentList from "@/components/myCommentList";
import myaxios from "@/utils/myaxios";
export default {
  data() {
    return {
      commentItem: [],
      articleDetail: {},
    };
  },
  components: {
    myedit,
    myCommentList,
    myCommentFooter,
  },
  async mounted() {
    this.init()
  },
  methods: {
    async init(){
      let res = await postComment(this.$route.params.id, {
      pageSize: 50,
      pageIndex: 1,
    });
    console.log(res);
    this.commentItem = res.data.data.map((v) => {
      v.user.head_img = myaxios.defaults.baseURL + v.user.head_img;
      return v;
    });
    let res2 = await newdDetail(this.$route.params.id);
    this.articleDetail = res2.data.data;
    },
    async handlerclick(content) {
      let res = await sendPostComment(this.$route.params.id, {
        content: content,
      });
      console.log(res);
      this.init()
      window.scrollTo(0,0)
      this.$toast.success(res.data.message)   
    },
  },
};
</script>

<style lang='less' scoped>
.lists {
  border-top: 5px solid #ddd;
  padding: 0 15px;
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
}
</style>