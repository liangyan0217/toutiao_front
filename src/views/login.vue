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
import {login} from '../apis/user'
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
    // async标记当前方法为异步方法
    async login() {
      // myaxios.post("/login", this.user)
      // 异步方法没有返回值，一般都需要传入回调函数
      // await必须处于async函数中，async标记的函数就是await关键字所在的函数，有await必须有async，反之不一定
      // await：可以让异步操作先执行完，再执行后续的代码，同时可以获取then回调函数的返回值
      let data = await login(this.user)
        // .then((data) => {
        //   console.log(data);
          if (data.data.statusCode === 401) {
            this.$toast.fail({
              message:data.data.message,
              // duration:5000
            });
          } else {
            this.$toast.success(data.data.message);
            localStorage.setItem("token", data.data.data.token);
            this.$router.push({ path: `/user/${data.data.data.user.id}` })
          }
        // })
        // .catch((err) => {
        //   console.log(err);
        // });
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