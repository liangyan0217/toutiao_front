<template>
  <div class="comment">
    <div class="addcomment" v-show="!isFocus">
      <input type="text" placeholder="写跟帖" @focus="handlerFocus" />
      <span
        class="comment"
        @click="$router.push({ path: `/commentList/${post.id}`},(onComplete) => {},(onAbort) => {})"
      >
        <i class="iconfont iconpinglun-"></i>
        <!-- 解决路由运用編程式导航，一直点击同一个按钮报错问题 -->
        <em>{{post.comment_length}}</em>
      </span>
      <i class="iconfont iconshoucang" @click="handlerCollect" :class="{active:post.has_star}"></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <div class="inputcomment" v-show="isFocus">
      <textarea ref="commtext" rows="5"></textarea>
      <div>
        <span @click="handlersend">发 送</span>
        <span @click="handlerCancle">取 消</span>
      </div>
    </div>
  </div>
</template>

<script>
import { sendPostComment } from "@/apis/article";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
    resComment: {
      type: Object,
    },
  },
  data() {
    return {
      isFocus: false,
    };
  },
  watch: {
    resComment(newv,oldv) {
      console.log(newv,oldv);
      if(this.resComment){
        this.isFocus = true;
        this.$nextTick(() => {
          this.$refs.commtext.focus();
        });
      }
    },
    // resComment(){
    //   if(this.resComment){
    //     this.isFocus=true
    //     this.$nextTick(() => {
    //     this.$refs.commtext.focus();
    //     });
    //   }
    // }
  },
  methods: {
    //   获取焦点时触发
    handlerFocus() {
      this.isFocus = !this.isFocus;
      // vue中此处的渲染和聚焦的操作是不同步的，先渲染，后聚焦，所以聚焦要加延迟
      // 方法一：
      // setTimeout(()=>{
      //   this.$refs.commtext.focus();
      // },10)
      // 方法二：
      this.$nextTick(() => {
        this.$refs.commtext.focus();
      });
    },
    // 收藏
    handlerCollect(e) {
      this.$emit("click", e);
    },
    // 发送
    async handlersend() {
      if (this.$refs.commtext.value !== "") {
        let res = await sendPostComment(this.$route.params.id, {
          content: this.$refs.commtext.value,
          parent_id: this.resComment.id,
        });
        console.log(res);
        // this.init();
        // window.scrollTo(0, 0);
        this.$toast.success(res.data.message);
      } else {
        this.$toast.fail("内容不能为空");
      }
      this.$emit("resetTop");
      this.$refs.commtext.value = "";
      this.isFocus = !this.isFocus;
    },
    // 取消
    handlerCancle() {
      this.$refs.commtext.value = "";
      this.isFocus = false;
      this.$emit('reset')
    },
  },
};
</script>

<style lang='less' scoped>
.comment {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  .inputcomment {
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    background-color: #fff;
    align-items: flex-end;
    textarea {
      flex: 3;
      background-color: #eee;
      border: none;
      border-radius: 10px;
      padding: 10px;
    }
    div {
      padding: 20px;
    }
    span {
      display: block;
      flex: 1;
      height: 24px;
      line-height: 24px;
      padding: 0 10px;
      background-color: #f00;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      font-size: 13px;
    }
  }
  .addcomment {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    margin-top: 20px;
    display: flex;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #fff;
    > input {
      flex: 4;
      height: 30px;
      line-height: 30px;
      border-radius: 15px;
      border: none;
      background-color: #eee;
      padding-left: 20px;
      font-size: 14px;
    }
    i {
      font-size: 20px;
      &.active {
        color: red;
      }
    }
    > span {
      flex: 1;
      position: relative;
      > em {
        position: absolute;
        right: 0;
        top: -5px;
        font-size: 10px;
        background-color: #f00;
        color: #fff;
        border-radius: 5px;
        padding: 3px 5px;
      }
    }
    > i {
      flex: 1;
    }
  }
}
</style>
