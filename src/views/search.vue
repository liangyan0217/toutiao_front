<template>
  <div class="search">
    <div class="header">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <van-search v-model="userKey" placeholder="请输入搜索关键词" shape="round" @blur="handleSearch"></van-search>
      <div @click="handleSearch">搜索</div>
    </div>
    <div class="historyList">
      <h2>历史记录</h2>
      <router-link
        to
        @click.native="handleSearch(value)"
        v-for="(value,index) in historyList"
        :key="index"
      >{{value}}</router-link>
    </div>
    <div class="historyList">
      <h2>搜索结果</h2>
      <router-link
        :to="`/newdetail/${value.id}`"
        v-for="value in searcList"
        :key="value.id"
      >{{value.title}}</router-link>
    </div>
  </div>
</template>

<script>
import { postSearch } from "@/apis/article";
export default {
  data() {
    return {
      userKey: "",
      searcList: [],
      historyList: [],
    };
  },
  mounted() {
    this.historyList = JSON.parse(
      localStorage.getItem("myHistoryList") || "[]"
    );
  },
  methods: {
    // 搜索结果
    async handleSearch(historyV) {
      console.log(historyV, typeof historyV);
      if (typeof historyV != "object" && historyV && historyV.trim()) {
        this.userKey = historyV;
      }
      let res = await postSearch(this.userKey);
      console.log(res);
      this.searcList = res.data.data;
      // 删除重复的历史数据
      let index = this.historyList.indexOf(this.userKey);
      if (index != -1) {
        this.historyList.splice(index, 1);
      }
      // 输入框为空时，不追加数据到historyList
      if(this.userKey.trim()){
      this.historyList.unshift(this.userKey);
      localStorage.setItem("myHistoryList", JSON.stringify(this.historyList));
      }
    },
  },
};
</script>

<style lang='less' scoped>
.header {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  .van-search {
    flex: 1;
    padding: 5px 12px;
  }
}
.historyList {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  h2 {
    line-height: 40px;
    font-weight: bold;
  }
  > a {
    display: block;
    text-decoration: underline;
    line-height: 30px;
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>