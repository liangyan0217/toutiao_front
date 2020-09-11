<template>
  <div class="focus">
      <myedit title='我的关注'>
          <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
          <van-icon name="wap-home-o" size="25" slot="right" @click="$router.push({name:'index'})"/>
      </myedit>
      <div class="list" v-for="value in followList" :key="value.id">
          <div class="box">
              <img :src="baseURL+value.head_img" alt="">
              <div class="center">
                  <p>{{value.nickname}}</p>
                  <span>2019-9-9</span>
              </div>
              <span @click="handlerclick(value.id)">取消关注</span>
          </div>
      </div>
  </div>
</template>

<script>
import myedit from '@/components/myedit'
import {myFollows,userUnfollow} from '@/apis/user'
import myaxios from '@/utils/myaxios'
export default {
  components: {
    myedit
  },
  data(){
    return {
      followList:[],
      baseURL:''
    }
  },
  async mounted () {
    this.init()
  },
  methods: {
    // 封装关注列表
    async init(){
      let res = await myFollows()
      console.log(res);
      this.followList = res.data.data
      this.baseURL= myaxios.defaults.baseURL
    },
    async handlerclick(id){
      let res = await userUnfollow(id)
      console.log(res);
      this.$toast.success(res.data.message)
      this.init()
    }
  }
}
</script>

<style lang='less' scoped>
.list{
    .box{
        display: flex;
        padding: 25px 10px;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        > img{
            display: block;
            width: 50/360*100vw;
            height: 50/360*100vw;
            border-radius: 50%;
            padding: 0 10px;
        }
        > .center{
            flex: 1;
            > p {
                line-height: 30px;
                font-size: 14px;
            }
            > span {
                font-size: 12px;
                color:#999;
            }
        }
        > span {
            height: 30px;
            background-color: #eee;
            font-size: 13px;
            border-radius: 30px;
            line-height: 30px;
            padding: 0px 15px;
        }
    }
}
</style>
