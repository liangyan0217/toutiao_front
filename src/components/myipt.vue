<template>
  <input type="text" class="ipt" @input="handleript"/>
</template>

<script>
export default {
  methods: {
    handleript(e){
      // 事件类型一定是input
      this.$emit('input',e.target.value)
    }
  }
};
</script>

<style lang="less" scoped>
.ipt {
  width: 318/360 * 100vw;
  height: 60px;
  outline: none;
  border: none;
  border-bottom: 3px solid #ccc;
  font-size: 20px;
  line-height: 60px;
}
</style>