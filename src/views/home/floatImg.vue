<template>
  <div class="wrapper">
    <div class="center" ref="mid">
      <img src="../../assets/home/cultivate/bttom.png" alt="" class="huawei" />
      <img src="../../assets/home/cultivate/r.png" alt="" class="r" />
      <img src="../../assets/home/cultivate/l.png" alt="" class="l" />
      <img src="../../assets/home/cultivate/lt.png" alt="" class="lt" />
      <img src="../../assets/home/cultivate/rb.png" alt="" class="rb" />
      <img src="../../assets/home/cultivate/t.png" alt="" class="t" />
      <img src="../../assets/home/cultivate/b.png" alt="" class="b" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.top {
  margin-top: 1px;
  height: 600px;
  background-size: 100% 100%;
  background-image: url("../../assets/home/cultivate/bg2.jpg");

  .section {
    margin-left: 20%;
    height: 100%;
    background-size: 100% 100%;
    width: 30%;
    background-color: rgba(255, 255, 255, 0.8);
    box-sizing: border-box;
    padding: 20px 50px;
    > :nth-child(1) {
      font-size: 25px;
      font-weight: 600;
      letter-spacing: 2px;
      color: #424242;
    }
    > :nth-child(2) {
      font-weight: 600;
      font-size: 30px;
      color: #a4a4a4;
    }
    > :nth-child(3) {
      font-weight: 600;
      font-size: 15px;
      color: rgba(50, 50, 50, 0.35);
      margin-bottom: 20px;
    }
    .text {
      color: #565555;
    }
  }
}
@keyframes qiu {
  0% {
    opacity: 1;
    transform: translate(2px, -10px);
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
    transform: translate(0px, 10px);
  }
}
@keyframes rqiu {
  0% {
    opacity: 0.8;
    transform: translate(2px, -20px);
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 0.8;
    transform: translate(0px, 20px);
  }
}
@keyframes logo {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }

  100% {
    transform: translate(-50%, -50%) scale(1.1);
  }
}

.center {
  height: 600px;
  z-index: 99;
  background-image: url("../../assets/home/cultivate/bg.jpg");
  background-size: 100% 100%;
  width: 100%;
  box-shadow: 1px 1px 8px #333333;
  overflow: hidden;
  .huawei {
    position: absolute;
    width: 50%;
    top: 50%;
    left: 50%;
    animation: none;
    animation: logo 5s linear infinite alternate;
  }
  position: relative;
  img {
    animation: qiu 3s infinite alternate;
    position: absolute;
  }
  .l {
    animation-delay: 2s;
    display: block;
    left: -5px;
    top: 30%;
    width: 10%;
  }
  .lt {
    animation-delay: 1s;
    display: block;
    left: 5%;
    top: 5%;
    width: 5%;
  }
  .t {
    animation-delay: 3s;
    display: block;
    left: 65%;
    top: -10px;
    width: 10%;
  }
  .b {
    animation-delay: 4s;
    display: block;
    left: 20%;
    bottom: -10px;
    width: 10%;
  }
  .rb {
    display: block;
    right: 10%;
    bottom: -10px;
    width: 5%;
  }
  .r {
    animation: rqiu 2s infinite alternate;

    display: block;
    right: 0%;
    top: 30%;
    width: 5%;
  }
}
.bottom {
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 600px;
  background-color: #d4d4d4;
  .tit {
    p {
      text-align: center;
      font-size: 30px;
      margin: 20px 0;
      font-weight: 600;
      color: #494949;
    }
    div {
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
      display: flex;
      align-items: center;
    }
  }
  .newsSection {
    height: 90% !important;
    justify-content: space-between;
    width: 80%;
    margin-top: 20px;
    display: flex;
    .left {
      .tit {
        margin: 8px 0;
      }
      img {
        width: 100%;
        height: 75%;
      }
      width: 50%;
      .content {
        overflow: hidden;
        height: 80px;
      }
    }

    .right {
      width: 45%;
      > :nth-last-child(1) {
        border: none;
      }
      > div {
        display: flex;
        border-bottom: 1px dashed #8d8c8c;
        padding: 10px 0 15px;
        > :nth-child(1) {
          .day {
            color: #333;
            font-size: 56px;
          }
          .date {
            text-align: center;
            color: #999;
            transform: translate(5px, -7px);
            font-size: 15px;
          }
        }
        > :nth-child(2) {
          margin-top: 5px;
          margin-left: 10px;
          .tit {
            font-size: 20px;
          }
          .content {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 14px;
            color: #333;
            max-width: 200px;
          }
        }
      }
    }
  }
}
/* 响应式布局 */
/* 1. 超小屏幕下  <=767 */
@media screen and (max-width: 767px) {
  .bottom {
    height: 400px;
  }
  .newsSection {
    flex-direction: column;
    .left {
      .tit {
        margin: 8px 0;
      }
      img {
        width: 100% !important;
        height: 75%;
      }
      width: 100% !important;
    }
    .right {
      display: none;
    }
  }
  .wrapper {
    .top {
      .section {
        margin: 0;
        width: 100% !important;
      }
    }
  }
  .center {
    display: none;
    .foot {
      > div {
        font-size: 16px;
      }
    }
  }
}
/* 2. 小屏幕下  768~992  */
@media screen and (max-width: 992px) {
  .bottom {
    height: 500px;
  }
  .wrapper {
    .center {
      .foot {
        > div {
          font-size: 16px;
        }
      }
    }
    .top {
      .section {
        width: 60%;
      }
    }
  }
}
</style>
