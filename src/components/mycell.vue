<template>
  <div class="cell">
    <div class="left">{{title}}</div>
    <div class="right" @click="hanlderclick">
      {{desc}}
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "desc"],
  methods: {
    hanlderclick(e){
      this.$emit('click',e)
    }
  }
};
</script>

<style lang='less' scoped>
.cell {
  padding: 20px 10px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  > .right {
    font-size: 13px;
    color: #888;
  }
}
</style>