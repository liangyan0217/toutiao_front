<template>
  <div>
    <myedit title="我的收藏">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      <van-icon name="wap-home-o" size="25" slot="right" @click="$router.push({name:'index'})"/>
    </myedit>
    <myarticle v-for="(value,index) in starList" :key="index" :post="value"></myarticle>
  </div>
</template>

<script>
import myedit from '@/components/myedit'
import myarticle from '@/components/myarticle'
import {userStar} from '@/apis/user'
export default {
  components: {
    myedit,
    myarticle
  },
  data(){
    return{
      starList:[]
    }
  },
  async mounted () {
    let res = await userStar()
    console.log(res);
    this.starList =res.data.data
  }
}
</script>

<style>

</style>