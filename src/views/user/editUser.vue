<template>
  <div class="editUser">
    <myedit title="编辑资料">
      <!-- 后退：$router.go(-1) 前进：$router.go(1) -->
      <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
    </myedit>
    <div class="avatar">
      <img :src="baseURL+current.head_img" alt />
      <van-uploader :after-read="afterRead" class="van-uploader" />
    </div>
    <mycell title="昵称" :desc="current.nickname" @click="nickshow=!nickshow"></mycell>
    <van-dialog v-model="nickshow" title="修改昵称" show-cancel-button @confirm="updateNickname">
      <van-field
        label="昵称"
        placeholder="请输入昵称"
        :value="current.nickname"
        @input="getnickname"
        ref="nick"
      />
    </van-dialog>
    <mycell title="密码" desc="*****" @click="passshow=!passshow"></mycell>
    <van-dialog v-model="passshow" title="修改密码" show-cancel-button @confirm="updatePassword" :before-close="beforeClose">
      <van-field
        :value="oldPassword"
        label="原密码"
        placeholder="请输入原密码"
        type="password"
        @input="getOldPass"
        required
      />
      <van-field
        :value="newpassword"
        label="新密码"
        placeholder="请输入新密码"
        type="password"
        @input="getNewPass"
        required
      />
    </van-dialog>
    <mycell title="性别" :desc="current.gender==1?'男':'女'" @click="gendershow=!gendershow"></mycell>
    <van-dialog v-model="gendershow" title="修改性别" show-cancel-button @confirm="updateGender">
      <van-picker
        :columns="['女','男']"
        :defaultIndex="current.gender"
        label="性别"
        placeholder="请输入性别"
        @change="getNewGender"
      />
    </van-dialog>
  </div>
</template>

<script>
import myedit from "@/components/myedit";
import mycell from "@/components/mycell";
import myaxios from "@/utils/myaxios";
import { user, userUpdate } from "@/apis/user";
import { upload } from "@/apis/upload";
export default {
  data() {
    return {
      baseURL: "",
      current: {},
      nickshow: false,
      passshow: false,
      gendershow: false,
      newnickname: "",
      oldPassword: "",
      newpassword: "",
      newgender: "",
    };
  },
  components: {
    myedit,
    mycell,
  },
  methods: {
    async afterRead(file) {
      let formdata = new FormData();
      formdata.append("file", file.file);
      let res = await upload(formdata);
      console.log(res);
      if (res.data.message === "文件上传成功") {
        this.current.head_img = res.data.data.url;
        this.$toast.success("文件上传成功");
        let result = await userUpdate(this.$route.params.id, {
          head_img: res.data.data.url,
        });
      } else {
        this.$toast.fail("文件上传失败");
      }
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    // 修改昵称
    getnickname(data) {
      // this.nickname=this.$refs.nick.$refs.input.value
      console.log(data);
      this.newnickname = data;
    },
    async updateNickname() {
      if(this.newnickname.trim().length===0){
        this.$toast.fail('请输入昵称')
      }else{
      let result = await userUpdate(this.$route.params.id, {
        nickname: this.newnickname,
      });
      if (result.data.message === "修改成功") {
        this.current.nickname = this.newnickname;
        this.$toast.success("修改昵称成功");
      } else {
        this.$toast.fail("修改昵称失败");
      }
      console.log(result);
      }
    },
    // 修改密码
    getOldPass(data) {
      console.log(data);
      this.oldPassword=data
    },
    getNewPass(data) {
      console.log(data);
      this.newpassword = data;
    },

    async updatePassword() {
      if(this.oldPassword===this.current.password){
        let result = await userUpdate(this.$route.params.id, {
          password: this.newpassword,
        });
        if (result.data.message === "修改成功") {
          this.current.password = this.newpassword;
          this.$toast.success("修改密码成功");
        } else {
          this.$toast.fail("修改密码失败");
        }
      }else{
        this.$toast.fail("原密码输入错误");
      }
    },
    beforeClose(action, done) {
      console.log(action);
      if (action === "confirm") {
        if (this.oldPassword !== this.current.password) {
          done(false);
        } else {
          // 清空
          this.oldPassword=this.newpassword=''
          done();
        }
      } else {
        this.oldPassword=this.newpassword=''
        done();
      }
    },
    // 修改性别
    getNewGender(picker, value, index) {
      console.log(index);
      this.newgender = index;
    },
    async updateGender() {
      let result = await userUpdate(this.$route.params.id, {
        gender: this.newgender,
      });
      if (result.data.message === "修改成功") {
        this.current.gender = this.newgender;
        this.$toast.success("修改性别成功");
      } else {
        this.$toast.fail("修改性别失败");
      }
    },
  },

  async mounted() {
    let res = await user(this.$route.params.id);
    this.baseURL = myaxios.defaults.baseURL;
    this.current = res.data.data;
    console.log(this.current);
  },
};
</script>

<style lang="less" scoped>
.editUser {
  .avatar {
    position: relative;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    > img {
      width: 90/360 * 100vw;
      height: 90/360 * 100vw;
      border-radius: 50%;
    }
    > .van-uploader {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
    }
    // /deep/.van-uploader__upload {
    //   width: 90/360 * 100vw;
    //   height: 90/360 * 100vw;
    // }
    // /deep/.van-uploader {
    //   position: absolute;
    //   left: 50%;
    //   top: 50%;
    //   transform: translate(-50%, -50%);
    //   opacity: 0;
    // }
  }
}
</style>