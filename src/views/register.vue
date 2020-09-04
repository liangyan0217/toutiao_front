<template>
  <div id="app">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <myipt placeholder="用户名/手机号码" v-model="user.username"></myipt>
        <myipt placeholder="昵称" v-model="user.password"></myipt>
        <myipt placeholder="密码" v-model="user.nickname"></myipt>
      </div>
      <p class="tips">
        有账号？
        <a href="#/login" class>去登录</a>
      </p>
      <mybutton @click="register">注册</mybutton>
    </div>
  </div>
</template>

<script>
import mybutton from '../components/mybutton'
import myipt from '../components/myipt'
import {myaxios} from "@/utils/myaxios"
import { Toast } from 'vant';
import 'vant/lib/index.css';
export default {
  data(){
    return{
      user:{
        username:'',
        password:'',
        nickname:''
      }
    }
  },
  components: {
    mybutton,
    myipt
  },
  methods: {
  // 注册
  // 接口类型:【POST】
  // 接口地址: /register
    register(){
      myaxios.post('/register',this.user)
      .then((data)=>{
        console.log(data);
        if(data.data.statusCode===400){
          Toast(data.data.message)
        }else{
          Toast(data.data.message)
        }
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>