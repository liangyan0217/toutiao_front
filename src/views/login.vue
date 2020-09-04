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
        <!-- 使用组件时，为组件设置的属性默认会被添加到封装组件的根元素上 -->
        <!-- v-model:实现了两个操作
        1.将变量的数据赋值给元素::value='user.username'
        2.将元素的数据赋值给变量:@input='dealipt'-->
        <myipt
          placeholder="用户名/手机号"
          v-model="user.username"
          :rlues="/^1[35789]\d{9}$|^1\d{4}$/"
          msg="手机号不合法，请重新输入"
        ></myipt>
        <myipt placeholder="密码" v-model="user.password" :rlues="/^\S{3,6}$/" msg="密码不符合规则"></myipt>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class>去注册</a>
      </p>
      <mybutton @click="login">登录</mybutton>
    </div>
  </div>
</template>

<script>
import mybutton from "@/components/mybutton";
import myipt from "@/components/myipt";
import { myaxios } from "@/utils/myaxios";
export default {
  data() {
    return {
      user: {
        username: "10086",
        password: "123",
      },
    };
  },
  components: {
    mybutton,
    myipt,
  },
  methods: {
    // 登录
    // 接口类型:【POST】
    // 接口地址: '/login'
    login() {
      // console.log(e);
      // console.log(this.user.username);
      myaxios.post("/login", this.user)
        .then((data) => {
          console.log(data);
          if (data.data.statusCode === 401) {
            this.$toast.fail(data.data.message);
          } else {
            this.$toast.success(data.data.message);
            localStorage.setItem("token", data.data.data.token);
            this.$router.push({ path: `/user/${data.data.data.user.id}` })
          }
        })
        .catch((err) => {
          console.log(err);
        });
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