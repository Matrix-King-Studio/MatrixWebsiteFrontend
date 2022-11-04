<template>
  <div class="wrapper">
    <div class="bottom" ref="bottom">
      <div class="tit">
        <p>新闻中心</p>
        <div>
          <img src="../../assets/home/cultivate/line.png" alt="" />
          <img src="../../assets/home/cultivate/News Center.png" alt="" />
          <img src="../../assets/home/cultivate/line.png" alt="" />
        </div>
      </div>

      <div class="newsSection">
        <div class="left" @click="newsGo(newsCenter.left.id)">
          <img :src="newsCenter.left.picture" alt="" />
          <div class="tit">
            {{ newsCenter.left.title }}
          </div>
          <div class="content">
            <!-- {{newsCenter.left.message}} -->
          </div>
        </div>

        <div class="right">
          <div
            v-for="(item, index) in newsCenter.right"
            @click="newsGo(item.id)"
          >
            <div>
              <div class="day">
                {{ item.day }}
              </div>
              <div class="date">
                {{ item.date }}
              </div>
            </div>

            <div>
              <div class="tit">
                {{ item.title }}
              </div>
              <div class="content">
                <!-- {{item.message}} -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newsCenter: {
        left: {
          picture: require("../../assets/home/cultivate/img.png"),
          title: "这是标题",
          message: "阿巴阿巴阿巴阿巴阿巴阿巴",
        },
        right: [
          {
            date: "2019-1",
            day: "12",
            title: "标题1",
            message: "阿巴阿巴阿巴阿巴",
          },
        ],
      },
    };
  },
};
</script>
<style lang="less" scoped>
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
