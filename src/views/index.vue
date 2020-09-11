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
    <van-tabs v-model="active" swipeable sticky>
      <van-tab v-for="(value,index) in cateList" :key="index" :title="value.name" ref="scrollY">
        <van-list
          v-model="cateList[active].loading"
          @load="onLoad"
          :finished="cateList[active].finished"
          finished-text="没有更多了"
        >
          <van-pull-refresh v-model="cateList[active].isLoading" @refresh="onRefresh">
            <!-- 文章列表 -->
            <!-- <keep-alive> -->
            <myarticle v-for="(value,index) in value.postList" :key="value.id" :post="value" @click="handlerclick(index)"></myarticle>
            <!-- </keep-alive> -->
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { categoryList } from "@/apis/cate";
import { articleList,newdDetail } from "@/apis/article";
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
  // 1.侦听器中的方法的名称必须和想侦听的属性名称完全一致
  // 2.侦听器中一般不会返回值
  // 3.侦听不能认为调用
  watch: {
    // 这个Active在单击切换和滑动切换都会变化，所以我们只需要监听这个值的变化
    async active() {
      // console.log("当前的栏目id是：", this.cateList[this.active].id);
      // // 加载这个栏目的文章数据
      // 我们得判断下当前的切换是否是第一次切换，如果是才去进行数据的获取，否则不获取
      if (this.cateList[this.active].postList.length == 0) {
        console.log(123);
        this.init();
      }
      document.documentElement.scrollTop=this.cateList[this.active].hasScrollTop
      console.log(this.cateList[this.active].hasScrollTop);
      console.log(this.active);
      // console.log(document.documentElement.scrollTop);
      console.log(this.cateList);
      // window.scrollTo(0, this.cateList[this.active].hasScrollTop)
      // console.log(document.documentElement.scrollTop);
      // window.pageYOffset=this.cateList[this.active].hasScrollTop
      // console.log(document.documentElement.scrollTop);
      // window.scroll(0, this.cateList[this.active].hasScrollTop)
    },
  },
  async mounted() {
    window.addEventListener('scroll', this.handleScrollY, true)
    // 栏目列表请求
    let res = await categoryList();
    console.log(res);
    this.cateList = res.data.data;
    this.id = localStorage.getItem("id");
    // 1.不同栏目的新闻数据应该是不一样的，意味着每个栏目都有属于这个栏目自己的新闻列表
    // 2.获取新闻列表数据的时候，需要传递栏目的id
    // 3.不同的栏目的新闻数据是没有任何的本质关联的，操作也是没有关系的
    // 4.如果我获取了某个栏目的新闻列表数据之后 ，数据如何存储？数据如何使用？
    // 5.基于业务需求，我们可以对源数据进行改造，我们可以在每一个栏目对象中，添加用于存储这个栏目新闻数据的数组
    this.cateList = this.cateList.map((value) => {
      return {
        ...value,// 展开对象，数据改造前的对象的所有成员
        postList: [],//这个栏目所有的数据
        // 当前页数
        pageIndex: 1,
        // 数据条数
        pageSize: 5,
        // 上拉加载
        loading: false,//上拉加载完毕,loading设置为false
        // 上拉加载完成
        finished: false,//若数据已全部加载完毕，finished设置为true
        // 下拉刷新
        isLoading: false,//下拉刷新加载完毕，isLoading设置为false
        // 存储页面滚动距离顶部的距离
        hasScrollTop:0
      };
    });
    console.log(this.cateList);
    // 新闻列表
    this.init();
  },
  // destroyed(){
  //   window.removeEventListener('scroll', this.handleScrollY);
  // },
  methods: {
    handleScrollY() {
      // console.log('滚动高度', window.pageYOffset)
      console.log(document.documentElement.scrollTop);
      if(document.documentElement.scrollTop!=40){
        this.cateList[this.active].hasScrollTop=document.documentElement.scrollTop
      }
      console.log(this.cateList);
    },
    // handlerScroll(){
    //   this.cateList[this.active].hasScrollTop=document.documentElement.scrollTop
    //   console.log(this.cateList[this.active].hasScrollTop);
    //   console.log(this.cateList);
    // },
    async init() {
      // 获取新闻列表数据
      let result = await articleList({
        category: this.cateList[this.active].id,
        // 当前页数
        pageIndex: 1,
        // 数据条数
        pageSize: 5,
      });
      // 将获取到的文章数据添加到改造出的postList对应的栏目中
      this.cateList[this.active].postList = result.data.data;
      console.log(this.cateList);
      console.log(result);
    },
    // 上拉加载
    onLoad() {
      // 这里设置定时器是为了查看加载效果
      setTimeout(async () => {
        this.cateList[this.active].pageIndex++;
        let result = await articleList({
          category: this.cateList[this.active].id,
          pageIndex: this.cateList[this.active].pageIndex,
          // 数据条数
          pageSize: this.cateList[this.active].pageSize,
        });
        // 将获取到的文章数据追加到改造出的postList中
        this.cateList[this.active].postList.push(...result.data.data);
        this.cateList[this.active].loading = false;
        if (this.cateList[this.active].pageSize > result.data.data.length) {
          this.cateList[this.active].finished = true;
        }
      }, 2000);
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(async () => {
        this.cateList[this.active].pageIndex = 1;
        this.cateList[this.active].postList.length = 0;
        let result = await articleList({
          category: this.cateList[this.active].id,
          pageIndex: this.cateList[this.active].pageIndex,
          // 数据条数
          pageSize: this.cateList[this.active].pageSize,
        });
        // 将获取到的文章数据追加到改造出的postList中
        this.cateList[this.active].postList.push(...result.data.data);
        this.cateList[this.active].isLoading = false;
        // 将finished重置为false,否则不能再进行上拉加载
        this.cateList[this.active].finished = false
      }, 2000);
    },
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