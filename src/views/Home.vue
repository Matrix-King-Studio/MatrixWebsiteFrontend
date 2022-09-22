<template>
  <div class="wrapper">
    <div class="top" ref="top" style="opacity: 0">
      <div class="left" ref="left"></div>
      <div class="center" ref="center">
        <div>
          <p>ABOUT MATRIX</p>
          <P>关于Matrix工作室</P>
          <P>———</P>
          <div class="text">{{ topText }}</div>
        </div>
      </div>
    </div>
    <div class="nav" ref="nav" style="opacity: 0">
      <p class="tit">专注技术培养</p>
      <div class="center">
        <img src="../assets/home/line.png" alt="" />
        <img src="../assets/home/Technical training.png" alt="" />
        <img src="../assets/home/line.png" alt="" />
      </div>
      <div class="ul cp">
        <div
          class="li"
          :class="liIndex == index ? 'acitve' : ''"
          v-for="(item, index) in navLi"
          @click="liCli(index)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <router-view :liIndex="liIndex"></router-view>
  </div>
</template>

<script>
import { animate } from "@/assets/isViewPort";
export default {
  name: "Home",
  mounted() {
    var bg1 = new Image();
    bg1.src = require("../assets/home/bg1.png");
    bg1.onload = () => {
      this.$refs.left.style.backgroundImage = `url(${bg1.src})`;
    };
    var bg12 = new Image();
    bg12.src = require("../assets/home/bg12.png");
    bg12.onload = () => {
      this.$refs.center.style.backgroundImage = `url(${bg12.src})`;
    };
    window.addEventListener("scroll", this.handleScroll, true);
    this.handleScroll();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      animate(this.$refs.top);
      animate(this.$refs.nav);
    },
    liCli(i) {
      this.liIndex = i;
    },
  },
  components: {},
  data() {
    return {
      liIndex: 0,
      navLi: [
        { name: "人工智能入门养成", url: "cultivate" },
        { name: "WEB开发实战", url: "practice" },
        { name: "校企联合活动推进", url: "activity" },
        { name: "就业指导规划", url: "jobGuide" },
      ],
      topText: `Matrix工作室是由天津科技大学人工智能学院的一群编程爱好者组成的，大家志同道合，相互鞭策，一起努力变得更优秀。Matrix工作室分为四个组，分别是AI组、IOS组、前端组、后端组。同时，每个组都有各组组长精心设计好的学习路线和学习资料，每隔一断时间都会调整。
在这里，学长学姐们会毫无保留将自己的学习经验和面试实习经验传授给学弟学妹们，来帮助
热爱编程、热爱学习的人工智能学子得到更好的资源，方便以后的实习就业。同时，matrix工作室
也会开展各种讲座，邀请优秀的学长学姐与同学们交流。`,
    };
  },
};
</script>
<style lang='less' scoped>
@media screen and (max-width: 767px) {
  .top {
    .right {
      display: none;
    }
    .left {
      display: none;
    }
    .center {
      width: 100% !important;
    }
  }
  .wrapper {
    .nav {
      .ul {
        width: 100% !important;
        font-size: 12px;
      }
    }
  }
}
/* 2. 小屏幕下  768~992  */
@media screen and (max-width: 992px) {
  .wrapper {
    .top {
      .center {
        width: 40%;
      }
      .right {
        display: none;
      }
    }
  }
  .wrapper {
    .nav {
      .ul {
        width: 95%;
      }
    }
  }
}
// 中间导航栏[专注技术培养...]
.nav {
  .acitve {
    background-color: #208ec5;
    height: 100%;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  .tit {
    font-size: 30px;
    letter-spacing: 10px;
    margin: 20px;
  }
  .center {
    transform: translateX(-2%);
    display: flex;
    align-items: center;
    justify-content: center;
    > :nth-child(2) {
      margin: 0 10px;
      width: 40%;
    }
    > :nth-child(1) {
      width: 20%;
    }
    > :nth-child(3) {
      width: 20%;
    }
  }
  .ul:hover > .li {
    background-color: #033651;
  }
  .ul {
    line-height: 51px;
    background-color: #033651;
    color: white;
    width: 60%;
    display: flex;
    margin-top: 30px;
    height: 51px;
    justify-content: space-around;
    .li {
      transition: all 0.5s;
      text-align: center;
      width: 25%;
    }
    .li:hover {
      background-color: #208ec5;
    }
  }
}
// 顶部[关于Matrix工作室...]
.top {
  display: flex;
  .left {
    width: 60%;
    background-size: 100% 100%;
    background-image: url("../assets/home/abg1.png");
  }
  .center {
    height: 800px;
    width: 40%;
    color: white;
    background-image: url("../assets/home/abg12.png");

    box-sizing: border-box;
    background-position: 0 0;
    background-size: auto 100%;
    background-repeat: no-repeat;

    > div {
      padding: 20px 50px;
      background-color: rgba(0, 0, 0, 0.2);
      height: 95%;
      > :nth-child(1) {
        font-size: 15px;
        margin-bottom: 5px;
        letter-spacing: 2px;
      }
      > :nth-child(2) {
        font-family: SourceHanSansCN-Regular;
        font-weight: 600;
        font-size: 25px;
      }
      > :nth-child(3) {
        font-weight: 600;
        font-size: 24px;
        margin-bottom: 20px;
      }
      .text {
        text-indent: 2em;
        line-height: 30px;
        font-size: 20px;
      }
    }
  }
}
</style>