<template>
  <div class="btn" @click="handlerclick">
    <!-- 匿名插槽：插槽没有名称，后期你在使用子组件的时候添加的内容，都会替换到这个结构 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    handlerclick(e){
      this.$emit('click',e)
    }
  }
};
</script>

<style lang="less" scoped>
.btn {
  width: 318 * 100vw/360;
  height: 50px;
  background-color: rgb(70, 158, 12);
  border-radius: 25px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
}
</style>