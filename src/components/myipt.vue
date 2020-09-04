<template>
  <input type="text" class="ipt" @input="handleript" @change="handlerchange" :class="statu?'success':'error'"/>
  <!-- <input type="text" class="ipt" @input="handleript" @change="handlerchange" :class="{success:statu,error:!statu}"/> -->
</template>

<script>
export default {
  data(){
    return{
      statu:true
    }
  },
  props:{
    rlues:RegExp,
    msg:String
  },
  methods: {
    handleript(e){
      // 事件类型一定是input
      this.$emit('input',e.target.value)
      // 验证正则规则
      if(this.rlues&&this.rlues.test(e.target.value)){
        this.statu=true
      }else{
        this.statu=false
      }
    },
    handlerchange(e){
      if(this.rlues && !this.rlues.test(e.target.value)){
        this.$toast.fail(this.msg ||'请重新输入')
      }
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
.error {
  border-bottom: 2px solid red;
}
.success {
  border-bottom: 2px solid green;
}
</style>