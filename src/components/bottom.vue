<template>
  <div class="wrapper" ref="wrapper" style="opacity: 0">
    <div class="left">
      <div class="top">
        <div>CONTACT</div>
        <div>商务合作</div>
      </div>

      <div class="bottom">
        <div>
          <img src="../assets/bottom/postion.png" alt="" />
          <div>
            <!-- <div>ADDRESS</div>-->
            <!-- <div>天津市滨海新区第十三大街天津科大学</div>-->
            <div>NAME</div>
            <div>Yuxia Huang</div>
          </div>
        </div>

        <div>
          <img src="../assets/bottom/email.png" alt="" />
          <div>
            <div>E-MAIL</div>
            <div>seatrader2022@126.com</div>
          </div>
        </div>
        <div>
          <img src="../assets/bottom/tel.png" alt="">
          <div>
            <div>TEL</div>
            <div>13983795259</div>
          </div>
        </div>

        <div style="transform: translateX(3px);">
          <div>
            <div>网站备案号</div>
            <div>浙ICP备2022020574号-1</div>
          </div>
        </div>
      </div>
    </div>

    <div class="right" ref="right">
      <img src="../assets/bottom/matrix.png" alt="" />
      <div>Matrix studio 工作室纳新群</div>
    </div>
  </div>
</template>
<script>
import { animate } from "@/assets/isViewPort";
export default {
  data() {
    return {};
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    this.handleScroll();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      animate(this.$refs.wrapper, "fadeIn");
    },
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  height: 200px;
  justify-content: center;
  display: flex;
  color: white;
  background-color: #666666;
}
.left,
.right {
  width: 30%;
}
.left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  .top {
    // margin: 50px 0;
  }
  .bottom {
    margin-top: 20px;
    width: 100%;
    display: flex;
    font-size: 12px;
    flex-wrap: wrap;
    justify-content: space-around;
    > div {
      width: 46%;
      margin-bottom: 20px;
      display: flex;
      img {
        transform: translateY(5px);
        margin-right: 20px;
        width: 20px;
        height: 25px;
      }
      > div {
        > :nth-child(2) {
          margin-top: 5px;
          padding-top: 5px;
          border-top: 1px solid white;
        }
      }
    }
    > :nth-child(2) {
      margin-left: 20px;
      img {
        width: 25px;
        height: 20px;
      }
    }
  }
}
.right {
  justify-content: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    height: 100px;
    margin-bottom: 5px;
  }
}
/* 响应式布局 */
/* 1. 超小屏幕下  <=767 */
@media screen and (max-width: 767px) {
  .left {
    margin-left: 1%;
    width: 79% !important;
    display: none;
  }
  .right {
    width: 20%;
  }
}
/* 2. 小屏幕下  768~992  */
@media screen and (max-width: 992px) {
  .left,
  .right {
    width: 45%;
  }
}
</style>
