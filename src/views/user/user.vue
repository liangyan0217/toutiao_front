<template>
  <div class="personal">
    <router-link to="/edit_profile">
      <div class="profile">
        <img :src="baseURL+current.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont" :class="current.gender?'iconxingbienv':'iconxingbienan'"></span>
            {{current.nickname}}
          </div>
          <div class="time">2019-9-24</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <mycell title="我的关注" desc="关注的用户"></mycell>
    <mycell title="我的跟帖" desc="跟帖/回复"></mycell>
    <mycell title="我的收藏" desc="文章/视频"></mycell>
    <mycell title="我的关注"></mycell>
    <mybutton class="btn" type='danger'>退出</mybutton>
  </div>
</template>

<script>
import mycell from '@/components/mycell'
import mybutton from '@/components/mybutton'
import { user } from '@/apis/user';
export default {
  data(){
    return{
      current:'',
      baseURL:''
    }
  },
  components: {
    mycell,
    mybutton
  },
  mounted () {
    // 用户详情
    // 接口类型:【GET】
    // 需要验证:【Authorization 】
    // 接口地址:/user/:id 
    // myaxios.get(`/user/${this.$route.params.id}`,{params:{id:this.$route.params.id}})
    user(this.$route.params.id)
    .then((data)=>{
      console.log(data);
      this.current=data.data.data
      this.baseURL=data.config.baseURL
    })
    .catch((err)=>{
      console.log(err);
    })
  }
};
</script>

<style lang="less" scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
.btn{
  margin: 20px auto;
}
</style>