<template>
  <div class="cate">
    <myedit title="栏目管理">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      <van-icon name="wap-home-o" size="25" slot="right" @click="$router.push({name:'index'})" />
    </myedit>
    <div class="content">
      <div class="del">
        <h3>点击删除栏目</h3>
        <div>
          <span v-for="(value,index) in cateList" :key="value.id" @click="delCateList(value,index)">{{value.name}}</span>
        </div>
      </div>
      <div class="add">
        <h3>点击添加栏目</h3>
        <div>
          <span v-for="(value,index) in addCateList" :key="value.id" @click="notHasCateList(value,index)">{{value.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myedit from "@/components/myedit";
import { categoryList } from "@/apis/cate";
export default {
  data() {
    return {
      // 已添加栏目列表
      cateList: [],
      // 未添加栏目列表
      addCateList: [],
    };
  },
  components: {
    myedit,
  },
  async mounted() {
    // 已添加栏目数据
    this.cateList = JSON.parse(localStorage.getItem("myCateList") || '[]') ;
    if (this.cateList.length===0) {
      // 栏目列表请求
      let res = await categoryList();
      console.log(res);
      // 关注和头条这两项栏目不需要做管理
      if(localStorage.getItem('token')){
        // 如果已登录，则栏目不需要管理关注和头条
        this.cateList = res.data.data.splice(2);
      }else{
        // 若未登录，则栏目不需要管理头条
        this.cateList = res.data.data.splice(1);
      }
    } 
    // 未添加栏目数据
    this.addCateList = JSON.parse(localStorage.getItem("notHasCateList") || '[]') ;
  },
  methods: {
    // 删除栏目
    delCateList(value,index){
      this.addCateList.push(value)
      localStorage.setItem('notHasCateList',JSON.stringify(this.addCateList))
      this.cateList.splice(index,1)
      localStorage.setItem('myCateList',JSON.stringify(this.cateList))
    },
    // 添加栏目
    notHasCateList(value,index){
      this.cateList.push(value)
      localStorage.setItem('myCateList',JSON.stringify(this.cateList))
      this.addCateList.splice(index,1)
      localStorage.setItem('notHasCateList',JSON.stringify(this.addCateList))
    },
  }
};
</script>

<style lang="less" scoped>
.content {
  padding: 10px 20px;
  .del {
    margin-bottom: 10px;
  }
  .del,
  .add {
    > h3 {
      // color: #666;
      font-weight: 700;
      padding: 10px 0;
    }
    > div {
      display: flex;
      flex-wrap: wrap;
      > span {
        padding: 10px;
        margin-left: 10px;
        margin-top: 10px;
        width: 15%;
        border: 1px solid #000;
        text-align: center;
      }
    }
  }
}
</style>