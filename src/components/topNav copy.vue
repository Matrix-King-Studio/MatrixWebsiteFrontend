<template>
  <div class="wrapper" :style="'position:' + position + ';'" ref="wrapper">
    <div class="phone">
      <div class="el-icon-s-grid left" @click="show = true"></div>
      <div class="text">{{ urlName }}</div>
      <van-popup
        v-model="show"
        position="right"
        style="height: 100%; width: 40%"
      >
        <div id="pup">
          <router-link
            v-for="(item, i) in navLi"
            :key="i"
            :to="item.url"
            @click.native="liCil2(item.url)"
          >
            {{ item.name }}
          </router-link>
        </div>
      </van-popup>
      <div class="set" id="set">
        <el-dropdown>
          <img
            src="../assets/top/camera.png"
            @click="login"
            class="camera"
            title="登录或注册"
            :style="islogin == 0 ? 'filter: grayscale(100%)' : ''"
          />
          <el-dropdown-menu slot="dropdown" v-if="!islogin"> </el-dropdown-menu>
          <el-dropdown-menu slot="dropdown" v-if="islogin">
            <el-dropdown-item
              class="changepsw"
              id="changepsw"
              @click.native="dialogVisible = true"
            >
              修改密码
            </el-dropdown-item>
            <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <img class="logo" @click="test" src="../assets/top/logo.png" />

    <div class="ul cp" @mouseleave="leave()">
      <div class="liBg" ref="x"></div>

      <router-link
        v-for="(item, i) in navLi"
        :key="i"
        class="head-left-menu"
        :to="item.url"
        @mouseenter.native="trans(i)"
        @click.native="liCil(i, item.url)"
        :style="{ color: '#788187' }"
      >
        {{ item.name }}
      </router-link>
    </div>
    <div class="set">
      <el-dropdown>
        <img
          src="../assets/top/camera.png"
          @click="login"
          class="camera"
          title="登录或注册"
          :style="islogin == 0 ? 'filter: grayscale(100%)' : ''"
        />

        <el-dropdown-menu slot="dropdown" v-if="!islogin"> </el-dropdown-menu>
        <el-dropdown-menu slot="dropdown" v-if="islogin">
          <el-dropdown-item
            class="changepsw"
            id="changepsw"
            @click.native="dialogVisible = true"
          >
            修改密码
          </el-dropdown-item>
          <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="wechatTip" v-if="userName">欢迎您！{{ userName }}</div>
      <div
        class="wechatTip"
        v-if="isBind == 0 && islogin == 1 && userInfo == null"
      >
        当前微信未绑定账号，请点击头像可进行登录绑定
      </div>
      <div
        class="wechatTip"
        v-if="isBind == 0 && islogin == 1 && userInfo != null"
      >
        当前账号未绑定微信，点击头像可进行微信绑定
      </div>
      <div class="popLogin" v-if="dialogVisible">
        <div class="box" v-if="dialogVisible">
          <div class="content">
            <div>
              <span>密码</span
              ><input type="password" v-model="changeInfo.password" />
            </div>
            <div>
              <span>重输密码</span
              ><input
                type="password"
                v-model="changeInfo.Mpassword"
                @blur="checkpsw"
              />
            </div>
            <div>
              <span>手机号</span
              ><input type="text" v-model="changeInfo.phone" />
            </div>
            <div>
              <span>学号</span
              ><input type="text" v-model="changeInfo.studentNumber" />
            </div>
            <div>
              <span>qq号</span
              ><input type="text" v-model="changeInfo.qqNumber" />
            </div>
          </div>
          <div class="sure" @click="changePassword">确定</div>
          <div class="off" @click="dialogVisible = false">X</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { user } from "../assets/http1";
export default {
  props: ["islogin", "isBind"],
  data() {
    return {
      issure: 0,
      lock: 0,
      show: false,
      dialogVisible: false,
      changeInfo: {
        password: "",
        Mpassword: "",
        phone: "",
        studentNumber: "",
        qqNumber: "",
      },
      height: "70",
      opacity: "1",
      position: "absolute",
      url: "home",
      urlName: "首页",
      userName: null,
      userInfo: null,
      color: [
        "#f5cfa8",
        "#edb8c2",
        "#afa7ce",
        "#a7d6ea",
        "#BFFBFD",
        "#c2dcb9",
        "#eeecbc",
      ],
      navLi: [
        { name: "首页", url: "home" },
        { name: "项目广场", url: "project" },
        { name: "学习路线", url: "studyRoute" },
        // {name:'公共资源',url:'resource'},
        { name: "每日一题", url: "problems" },
        { name: "留言板", url: "msgboard" },
        { name: "招贤纳士", url: "recruit" },
      ],
    };
  },
  watch: {
    url(val) {
      this.navLi.forEach((el) => {
        if (val == el.url) this.urlName = el.name;
      });
    },
    islogin(val) {
      const userInfo = JSON.parse(window.localStorage.getItem("user"));
      if (
        userInfo &&
        userInfo.openid &&
        (userInfo.Username || userInfo.username)
      ) {
        this.userName = userInfo.Username || userInfo.username;
      }
      this.userInfo = window.localStorage.getItem("user");
      if (val == 0) {
        this.userName = null;
      }
    },
    $route(val) {
      if (val.name == "news") {
        this.urlName = "新闻";
      }
    },
  },
  mounted() {
    setTimeout(() => {
      const userInfo = JSON.parse(window.localStorage.getItem("user"));
      if (
        userInfo &&
        userInfo.openid &&
        (userInfo.Username || userInfo.username)
      ) {
        this.userName = userInfo.Username || userInfo.username;
      }
    }, 500);
    // 刷新页面导航BUG修复
    this.navLi.forEach((el, i) => {
      if (el.url == this.$route.path.replace("/", "")) {
        this.url = el.url;
        this.$refs.x.style.left = 2.1 + 16.7 * i + "%";
        this.setColor(i);
      }
    });
    // 动画效果
    window.addEventListener("scroll", this.handleScrolls, true);
    this.issure = this.islogin;
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    //  用户改密码
    async changePassword() {
      let { password, Mpassword, phone, studentNumber, qqNumber } =
        this.changeInfo;
      if (password && Mpassword && phone && studentNumber && qqNumber) {
        let res = await user.changePassword(this.changeInfo);
        console.log(res);
        if (res.reCode == "200") this.$message.success("修改成功");
        else this.$message(res.reMsg);
      } else this.$message.warning("信息不全，请补齐");
    },
    loginOut() {
      this.showBox();
      if (window.sessionStorage.getItem("user")) {
        this.issure = 0;
        window.sessionStorage.clear();
        window.localStorage.clear();
        this.$message.success("退出成功");
      } else {
        this.$message.error("请先登录");
      }
      this.$emit("login", 0);
    },
    showBox() {
      if (window.sessionStorage.getItem("user")) {
        this.issure = 1;
      } else {
        this.issure = 0;
      }
    },
    checkpsw() {
      if (this.changeInfo.password != this.changeInfo.Mpassword)
        this.$message.warning("两次密码不一，请重新输入！");
    },
    login() {
      console.log(this.userInfo);
      if (this.userInfo) {
        this.$emit("login", 2);
        return;
      }
      this.showBox();
      if (this.issure == 0) {
        this.$emit("login", 1);
      }
    },
    leave() {
      // bug修复
      setTimeout(() => {
        this.navLi.forEach((el, i) => {
          if (el.url == this.url) {
            this.$refs.x.style.left = 2.1 + 16.7 * i + "%";
            this.setColor(i);
          }
        });
      }, 100);
    },
    handleScrolls() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop >= 120) {
        this.position = "fixed";
        this.$refs.wrapper.classList.add("animated", "fadeInDown", "shadow");
      }
      if (scrollTop == 0) {
        this.$refs.wrapper.classList.remove("animated", "fadeInDown", "shadow");
        this.position = "absolute";
      }
    },
    test() {},
    handleScroll(e) {},
    liCil2(url) {
      this.url = url;
      this.show = false;
      if (url == "resource") {
        alert("敬请期待！");
      }
    },
    liCil(e, url) {
      // this.$router.push({name:url})
      this.url = url;
      console.log(url);

      if (url == "resource") {
        alert("敬请期待！");
        this.url = "home";
        setTimeout(() => {
          this.$refs.x.style.left = 2.1 + 16.6 * 0 + "%";
        }, 2000);

        return;
      }

      console.log("123");
      this.$refs.x.style.left = 2.1 + 16.6 * e + "%";
    },
    // 导航动画
    trans(e) {
      setTimeout(() => {
        this.$refs.x.style.width = "12%";
        this.$refs.x.style.transform = "translateX(0)";
      }, 400);
      setTimeout(() => {
        this.$refs.x.style.left = 2.1 + 16.7 * e + "%";
      }, 100);
      setTimeout(() => {
        this.$refs.x.style.width = "4%";
        this.$refs.x.style.transform = "translateX(50%)";
        this.setColor(e);
      }, 10);
    },
    setColor(i) {
      this.$refs.x.style.backgroundColor = this.color[i];
    },
  },
};
</script>
<style lang="less" scoped>
.shadow {
  box-shadow: 0px 5px 2px 0px rgba(50, 50, 50, 0.2);
}
.liBg {
  transition: all 0.5s;
  height: 32px;
  background-color: #f5cfa8;
  width: 12%;
  border-radius: 10px;
  left: 2.1%;
  top: 14px;
  z-index: 1;
  position: absolute;
}
#pup {
  display: flex;
  flex-direction: column;
  text-align: center;
  box-sizing: border-box;
  padding-top: 10px;
  a {
    color: black;
    margin-bottom: 10px;
  }
}
img {
  margin: 0 5%;
}
.wrapper {
  left: 0;
  top: 0;
  height: 77px;
  z-index: 999;
  width: 100%;
  background-color: white;
  align-items: center;
  display: flex;
  justify-content: center;
}
.logo {
  width: 40px;
  height: 46px;
}

.set {
  display: flex;
  // flex-direction: column;

  align-items: flex-end;
  .camera {
    width: 40px;
    height: 40px;
    user-select: none;
    margin-left: 20px;
    transform: translateY(5px);
  }
  .changepsw {
    white-space: nowrap;
    font-size: 12px;
    color: #94989b;
    margin-left: 14px;
    margin-top: 5px;
    cursor: pointer;
  }

  .popLogin {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 999;
    top: 0;
    left: 0;
  }
  .box {
    width: 400px;
    height: 420px;
    position: fixed;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    // 主体内容
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      div {
        &:first-child {
          margin: 60px auto 30px auto;
        }
        margin-bottom: 20px;
        span {
          display: inline-block;
          width: 90px;
        }
      }

      input {
        cursor: text;
        -webkit-appearance: none;
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
    }
    // 确定修改密码
    .sure {
      width: 100px;
      height: 40px;
      line-height: 40px;
      color: #fff;
      background: #409eff;
      text-align: center;
      border-radius: 3px;
      cursor: pointer;
    }
    .off {
      position: absolute;
      right: 20px;
      color: #afafaf;
      font-weight: 600;
      font-size: 20px;
      top: 15px;
    }
  }
}

.ul {
  position: relative;
  background-image: url("../assets/top/bg.png");
  background-size: 100% 100%;
  display: flex;
  justify-content: space-around;
  width: 50%;
  .li {
    z-index: 99;
    line-height: 55px;
  }
}
.head-left-menu {
  position: relative;
  z-index: 22;
  cursor: pointer;
  font-size: 14px;
  color: #788187;
  border-radius: 10px;
  padding: 10px 0;
  text-decoration: none;
  text-align: center;
  box-sizing: border-box;
  width: 90px;
  height: 40px;
  margin: 10px 0 0 0;
}
.wechatTip {
  font-size: 10px;
  color: rgb(21, 135, 66);
  margin-left: 10px;
}
.phone {
  z-index: 999;
  background-color: white;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  display: none;
  justify-content: space-between;
  padding: 0 20px;
  .text {
    transform: translateX(1.5em);
  }
  .left {
    width: 20px;
    font-size: 30px;
  }
  .right {
    width: 35px;
  }
}
/* 响应式布局 */
/* 1. 超小屏幕下  <=767 */
@media screen and (max-width: 767px) {
  .ul {
    width: 100%;
    opacity: 0;
  }
  .phone {
    display: flex;
  }

  .camera {
    display: none;
  }
  #changepsw {
    display: none;
  }
  .logo {
    display: none;
  }
  .popLogin {
    width: 90% !important;
  }
}
/* 2. 小屏幕下  768~992  */
@media screen and (max-width: 992px) {
  .ul {
    width: 100%;
  }
}
</style>
