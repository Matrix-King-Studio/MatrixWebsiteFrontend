<template>
  <div id="app">
    <div class="topNavSite"></div>
    <topNav @login="loginHandle" :islogin="islogin" :isBind="isBind"></topNav>
    <router-view :isLogin="islogin"></router-view>
    <el-dialog title="微信登录" :visible.sync="wechatQcodeShow">
      <div><div id="wx_login_container"></div></div>
    </el-dialog>
    <div class="popLogin" v-if="loginShow">
      <!-- 登录 -->
      <div class="Login same" v-if="!isregister">
        <div>
          <input type="text" v-model="Logininfo.email" />
        </div>
        <div>
          <input type="password" v-model="Logininfo.password" />
        </div>
        <div class="btn" @click="login">登录</div>
        <div class="off" @click="loginShow = false">X</div>
        <div class="change" @click="isregister = true">注册账号</div>
        <div
          class="change"
          @click="wechatQcodeShow = true"
          style="right: 20px; left: auto; cursor: pointer; color: #158742"
        >
          微信登录
        </div>
      </div>

      <!-- 注册 -->
      <div class="Register same" v-if="isregister">
        <div>
          <span>昵称</span><input type="text" v-model="Registerinfo.username" />
        </div>
        <div style="display: flex; align-items: center">
          <span>邮箱</span
          ><input type="text" v-model="Registerinfo.email" @blur="checkemail" />
          <button
            :class="{ sendCode: true, sendok: issend, sendno: !issend }"
            @click="sendCode($event)"
          >
            发送验证码
          </button>
        </div>
        <div>
          <span>邮箱验证码</span><input type="text" v-model="emailCode" />
        </div>
        <div>
          <span>密码</span
          ><input type="password" v-model="Registerinfo.password" />
        </div>
        <div>
          <span>确认密码</span
          ><input type="password" v-model="passwords" @blur="checkpsw" />
        </div>
        <div class="btn" style="width: 60px; margin: 0 auto" @click="Register">
          注册
        </div>
        <div
          class="change"
          @click="isregister = false"
          style="left: 20px; bottom: 0px"
        >
          登录
        </div>

        <div class="off" @click="loginShow = false">X</div>
      </div>
    </div>

    <bottom></bottom>
  </div>
</template>

<script>
import topNav from "./components/topNav.vue";
import bottom from "./components/bottom.vue";
import { user, h, httpWeChat } from "./assets/http1";
export default {
  name: "app",
  components: {
    topNav,
    bottom,
  },
  data() {
    return {
      Logininfo: {
        password: "",
        email: "",
      },
      Registerinfo: {
        email: "",
        password: "",
        username: "",
      },
      passwords: "",
      loginShow: false,
      islogin: 0,
      isregister: false,
      emailCode: "", // QQ邮箱的验证码
      emailKey: "", //验证的key
      vertify: false,
      issend: false,
      wechatQcodeShow: false,
      isBind: 0,
    };
  },
  watch: {
    wechatQcodeShow(val) {
      if (val) {
        setTimeout(() => {
          this.get_wx_qrcode();
        }, 500);
      }
    },
    immediate: true,
    issend(newval, oldval) {
      this.issend = newval;
    },
  },
  mounted() {
    // setTimeout(() => {
    //   this.get_wx_qrcode();
    // }, 1000);
    if (window.localStorage.getItem("user")) {
      window.sessionStorage.setItem(
        "user",
        window.localStorage.getItem("user")
      );
    }
    if (window.sessionStorage.getItem("user")) {
      this.islogin = 1;
      const isOpenId = JSON.parse(window.sessionStorage.getItem("user")).openid;
      if (isOpenId) {
        window.localStorage.setItem("openId", isOpenId);
        this.isBind = 1;
      }
      const openid = window.localStorage.getItem("openId");
      if (openid && this.isBind != 1) {
        const id = JSON.parse(window.sessionStorage.getItem("user")).id;
        httpWeChat.bind({ id, openid }).then((res) => {
          if (res.reCode == 200) {
            this.isBind = 1;
            this.$message("绑定微信成功！");
          }
        });
      }
    }
    this.getOpenId();
    this.weChatLogin();
  },
  methods: {
    weChatLogin() {
      const openId = window.localStorage.getItem("openId");
      if (openId && this.islogin == 0) {
        httpWeChat.getUserInfo(openId).then((res) => {
          console.log(res);
          if (res.reCode == 404) {
            this.islogin = 1;
            this.isBind = 0;
          }
          if (res.reCode == 200) {
            window.sessionStorage.setItem(
              "user",
              JSON.stringify(res.body.dataInfo)
            );
            window.localStorage.setItem(
              "user",
              JSON.stringify(res.body.dataInfo)
            );
            this.islogin = 1;
            this.isBind = 1;
          }
        });
      }
    },
    async getOpenId() {
      if (window.location.href.indexOf("code=") != -1) {
        let data = window.location.href.split("?")[1].split("&");
        await this.getWechatState();
        data = {
          code: data[0].split("=")[1],
          state: window.sessionStorage.getItem("state"),
        };
        httpWeChat.callback(data).then((res) => {
          if (res.body.dataInfo.openid) {
            window.localStorage.setItem("openId", res.body.dataInfo.openid);
            window.location.href = "http://www.matrix-studio.top";
          }
        });
      }
    },
    async getWechatState() {
      let weChatState = (await httpWeChat.getState())?.body?.dataInfo?.state;
      window.sessionStorage.setItem("state", weChatState);
    },
    get_wx_qrcode() {
      let wx_login = new WxLogin({
        id: "wx_login_container",
        appid: "wx53cf447461989356",
        scope: "snsapi_login",
        redirect_uri: encodeURIComponent("http://www.matrix-studio.top/"),
        state: Math.ceil(Math.random() * 100),
        href: "data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDI0MHB4O21hcmdpbi10b3A6MjVweDtib3JkZXI6MH0KLmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30KLmltcG93ZXJCb3ggLmluZm8ge2Rpc3BsYXk6bm9uZX0KLnN0YXR1c19pY29uIHtkaXNwbGF5Om5vbmV9Ci5pbXBvd2VyQm94IC5zdGF0dXMge3RleHQtYWxpZ246IGNlbnRlcjtwYWRkaW5nOjB9Ci5pbXBvd2VyQm94IC5pbmZve21hcmdpbjogLTEwcHggYXV0b30K",
        style: "black",
        self_redirect: false,
      });
      console.log(wx_login, "@@");
    },
    // 登录
    async login() {
      let data = await user.login(this.Logininfo);
      console.log(data);
      if (data.reCode == "200") {
        console.log(111);
        window.sessionStorage.setItem("user", JSON.stringify(data.body));
        window.localStorage.setItem("user", JSON.stringify(data.body));
        this.$message(data.reMsg);
        this.islogin = 1;
        this.loginShow = false;
        this.Logininfo.password = "";
        this.Logininfo.username = "";
      } else this.$message.warning("登录失败,密码或账号错误！");
    },
    loginHandle(e) {
      console.log(e, "@#@#");
      if (e == 1) {
        this.loginShow = true;
      } else if (e == 2) {
        this.wechatQcodeShow = true;
      } else {
        this.islogin = 0;
      }
    },
    // 注册
    async Register() {
      let { username, password, email } = this.Registerinfo;
      if (username && password && email && this.passwords && this.emailCode) {
        await this.emailVertify();
        if (this.vertify) {
          let res = await user.register(this.Registerinfo);
          if (res.reCode == "200") {
            this.$message.success("注册成功");
            this.isregister = false;
          } else {
            this.$message.warning(res.reMsg);
          }
        } else {
          this.$message("验证码错误");
        }
      } else this.$message("信息不全,请补全");
    },

    // 检查邮箱格式
    checkemail() {
      let rule =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!rule.test(this.Registerinfo.email))
        this.$message.warning("邮箱格式错误");
    },

    //发送验证码
    async sendCode(e) {
      if (this.Registerinfo.email) {
        console.log(this.Registerinfo.email);
        let res = await user.emailSend(this.Registerinfo.email);
        let time = 30;
        e.target.disabled = true;
        this.issend = true;
        console.log(res, "发送验证码");
        if (res.reCode == "200") {
          this.emailKey = res.body.emailKey;
        } else {
          this.$message.warning(reMsg);
        }

        let timer = setInterval(() => {
          if (time == 0) {
            clearInterval(timer);
            e.target.disabled = false;
            this.issend = false;
            e.target.innerHTML = "发送验证码";
            time = 30;
          } else {
            e.target.innerHTML = "还剩" + time + "秒";
            time--;
          }
        }, 1000);
      } else {
        this.$message("未输入邮箱");
      }
    },

    //邮箱验证码验证
    async emailVertify() {
      let res = await user.emailVertify(this.emailCode, this.emailKey);
      console.log(res, "邮箱验证");
      if (res.reCode == "200") {
        this.vertify = true;
      } else {
        this.$message.warning(res.reMsg);
        this.vertify = false;
      }
    },

    //检查两次密码是否一样
    checkpsw() {
      if (this.Registerinfo.password != this.passwords) {
        this.$message.warning("两次密码不一样!");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.popLogin {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 999;
  top: 0;
  left: 0;

  .same {
    width: 400px;
    position: fixed;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
  }
  // input样式
  input {
    cursor: text;
    appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  input:focus {
    outline: none;
    border-color: #409eff;
  }

  // 关闭按钮
  .off {
    position: absolute;
    right: 20px;
    color: #afafaf;
    font-weight: 600;
    font-size: 20px;
    top: 10px;
  }

  // 按钮
  .btn {
    margin-top: 30px;
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
    padding: 12px 40px;
    transition: 0.1s;
    font-weight: 500;
    font-size: 14px;
    border-radius: 4px;
    text-align: center;
  }

  // 切换
  .change {
    position: absolute;
    left: 20px;
    bottom: 20px;
    color: #a6a7aa;
    align-self: flex-start;
    font-size: 13px;
  }

  // 登录
  .Login {
    position: relative;
    padding: 7px;
    align-items: center;
    > :nth-child(1) {
      margin-top: 70px;
    }
    > :nth-child(1)::before {
      content: "邮箱:";
      position: absolute;
      transform: translate(-120%, 50%);
    }
    > :nth-child(2)::before {
      content: "密码:";
      position: absolute;
      transform: translate(-120%, 50%);
    }
    > :nth-child(2) {
      margin-top: 40px;
    }
  }

  // 注册
  .Register {
    position: relative;
    padding: 7px;
    & > div {
      margin-bottom: 15px;
      &:nth-child(1) {
        margin-top: 55px;
      }
      & > span {
        display: inline-block;
        width: 90px;
        margin-left: 5px;
        text-align: center;
      }
      .sendCode {
        height: 35px;
        width: 70px;
        font-size: 12px;
        color: #fff;
        border: none;
        border-radius: 3px;
        margin-left: 5px;
      }
      .sendok {
        background: #a6a7aa;
      }
      .sendno {
        background: #409eff;
      }
    }
  }
}
.topNavSite {
  height: 75px;
}
body,
html {
  width: 100%;
  background-color: rgb(250, 250, 250);
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
  background-color: white;
  width: 100%;
  max-width: 2000px;
}

#wx_login_container {
  // position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}
* {
  margin: 0;
  padding: 0;
  cursor: default;
}
p {
  margin: 0;
}
/* 指针为手指 */
.cp {
  cursor: pointer;
}
body::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 15px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
body::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
body::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
</style>
