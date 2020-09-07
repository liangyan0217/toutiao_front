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
        <myipt placeholder="密码" v-model="user.nickname" type="password"></myipt>
      </div>
      <p class="tips">
        有账号？
        <a href="#/login" class>去登录</a>
      </p>
      <mybutton @click="handlerregister">注册</mybutton>
    </div>
  </div>
</template>

<script>
import mybutton from "@/components/mybutton";
import myipt from "@/components/myipt";
import {register} from "@/apis/user";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
        nickname: "",
      },
    };
  },
  components: {
    mybutton,
    myipt,
  },
  methods: {
    // 注册
    // 接口类型:【POST】
    // 接口地址: /register
    async handlerregister() {
      let res = await register(this.user);
      console.log(res);
      if (res.data.statusCode === 400) {
        this.$toast.fail(res.data.message);
      } else {
        this.$toast.success(res.data.message);
        this.$router.push({name:'login'})
      }
    },
  },
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