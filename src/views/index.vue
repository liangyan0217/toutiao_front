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
      <div class="right" @click="$router.push({path:`/user/${id}`})">
        <van-icon name="user-circle-o" />
      </div>
    </div>
    <!-- 标签页 -->
    <van-tabs v-model="active" swipeable sticky @click="handleractive" @change="handlerchange">
      <van-tab v-for="(value,index) in cateList" :key="index" :title="value.name">
        <!-- 文章列表 -->
        <myarticle v-for="(value,index) in value.postList" :key="value.id" :post="value"></myarticle>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { categoryList } from "@/apis/cate";
import { articleList } from "@/apis/article";
import myarticle from "@/components/myarticle";
export default {
  components: {
    myarticle,
  },
  data() {
    return {
      active: 0,
      cateList: [],
      id: "",
    };
  },
  async mounted() {
    // 栏目列表请求
    let res = await categoryList();
    console.log(res);
    this.cateList = res.data.data;
    this.id = localStorage.getItem("id");
    // 文章列表
    // let result = await articleList({
    //   category: this.cateList[this.active].id,
    // });
    // console.log(result);
    // 1.不同栏目的新闻数据应该是不一样的，意味着每个栏目都有属于这个栏目自己的新闻列表
    // 2.获取新闻列表数据的时候，需要传递栏目的id
    // 3.不同的栏目的新闻数据是没有任何的本质关联的，操作也是没有关系的
    // 4.如果我获取了某个栏目的新闻列表数据之后 ，数据如何存储？数据如何使用？
    // 5.基于业务需求，我们可以对源数据进行改造，我们可以在每一个栏目对象中，添加用于存储这个栏目新闻数据的数组
    this.cateList = this.cateList.map((value) => {
      return {
        ...value,
        postList: [],
        // 当前页数
        pageIndex: 1,
        // 数据条数
        pageSize: 20,
      };
    });
    console.log(this.cateList);
    let result = await articleList({
      category: this.cateList[this.active].id,
    });
    // 将获取到的文章数据追加到改造出的postList中
    this.cateList[this.active].postList = result.data.data;
    console.log(this.cateList);
    console.log(result);
  },
  methods: {
    async handleractive() {
      console.log(this.active);
      // console.log(this.cateList[this.active].id);
      // 获取相应栏目的文章
      let result = await articleList({
        category: this.cateList[this.active].id,
      });
      // 将获取到的文章数据追加到改造出的postList中
      this.cateList[this.active].postList = result.data.data;
      // console.log(this.cateList);
      // console.log(result);
    },
    handlerchange() {
      console.log(this.active);
    },
  },
  // 1.侦听器中的方法的名称必须和想侦听的属性名称完全一致
  // 2.侦听器中一般不会返回值
  // 3.侦听不能认为调用
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