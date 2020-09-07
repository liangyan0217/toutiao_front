<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <van-icon name="search" />
        <span>搜索商品</span>
      </div>
      <div class="right">
        <van-icon name="user-circle-o" />
      </div>
    </div>
    <!-- 标签页 -->
    <van-tabs v-model="active" swipeable sticky>
      <van-tab v-for="(value,index) in cateList" :key="index" :title="value.name">{{value.name}}</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {categoryList} from '@/apis/cate'
export default {
  data(){
    return{
      active:0,
      cateList:[],
    }
  },
  async mounted () {
    // 栏目列表请求
    let res = await categoryList()
    console.log(res);
    this.cateList=res.data.data
  },
};
</script>

<style lang="less" scoped>
.header {
  height: 40px;
  background-color: rgb(255, 0, 0);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  .search {
    flex: 1;
    height: 30px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo {
    .iconfont {
      font-size: 50px;
    }
  }
  .right {
    font-size: 30px;
  }
  .logo,
  .right {
    padding: 0 10px;
  }
}
</style>