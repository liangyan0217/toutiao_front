<template>
  <div class="commentItem">
    <myCommentList :parent="parent.parent" v-if="parent.parent" @resComment="handlerRes(parent)"></myCommentList>
      <div class="top">
          <div class="left">
              <span>{{parent.user.nickname}}</span> &nbsp;&nbsp;&nbsp;
              <span>2分钟前</span>
          </div>
          <span @click="handlerRes">回复</span>
      </div>
      <div class="bottom">{{parent.content}}</div>
  </div>
</template>

<script>
export default {
  name:'myCommentList',
  props:['parent'],
  methods: {
    handlerRes(){
      this.$emit('resComment')
      console.log(this.parent);
    }
  }
};
</script>

<style lang='less' scoped>
.commentItem{
        border: 1px solid #ccc;
        padding: 3px;
        margin-top: 2px;
        .top{
            font-size: 12px;
            color: #aaa;
            display: flex;
            justify-content: space-between;
        }
        .bottom{
            font-size: 13px;
            line-height: 40px;
        }
    }
</style>