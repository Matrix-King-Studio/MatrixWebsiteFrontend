<template>
  <div class="wrapper">
    <!-- 主体 -->
    <div class="problemshow">
      <div class="main">
        <div style="min-height: 1px; width: 850px">
          <div class="left animated fadeInUp" :style="`display:${leftShow}`">
            <!-- 题目展示 -->
            <div v-for="item in list" :key="item.id">
              <h2>{{ item.problemLevel }}</h2>
              <p>
                <span> {{ item.title }}</span>
              </p>
              <p>
                <span>题目链接：</span>
                <a :href="item.link" target="_blank"> 点击打开链接</a>
              </p>
              <p><span>题目描述：</span>{{ item.problemDescribe }}</p>
              <p>
                <span>参考答案：</span>
                <a :href="item.answer" target="_blank">点击打开链接</a>
              </p>
              <el-tag v-if="item.algorithmTag">{{ item.algorithmTag }}</el-tag>
              <el-tag type="success" v-if="item.tag">{{ item.tag }}</el-tag>
              <el-tag type="info" v-if="item.dataStructureTag">{{
                item.dataStructureTag
              }}</el-tag>
              <div
                class="submit"
                :style="{ backgroundColor: isLogin ? 'white' : '#eeeeee' }"
              >
                <input
                  :disabled="!isLogin"
                  type="text"
                  :style="{
                    backgroundColor: isLogin ? 'white' : '#eeeeee',
                    width: 'calc(100% - 110px)',
                  }"
                  placeholder="我的答案"
                  v-model="item.blog"
                />
                <div
                  :style="{ cursor: 'pointer', opacity: isLogin ? '1' : '0.4' }"
                  @click="Submit(item)"
                >
                  提交
                </div>
              </div>
            </div>

            <!-- 没有相关题目，请重新搜索 -->
            <div v-if="list.length == 0" id="nosearch">
              没有相关题目，请重新搜索
            </div>
          </div>
        </div>

        <div class="right animated fadeInRight">
          <!-- 日历 -->
          <div class="time">
            <div
              class="subscribe"
              :style="{
                'background-color':
                  isLogin && !isSub ? 'rgba(20, 132, 192, 0.83)' : '#cccccc',
              }"
              @click="subscribe"
            >
              {{ isSub ? "已订阅" : "订阅" }}
            </div>
            <div class="data">
              <el-calendar v-model="nowDate" style="user-select: none">
                <template slot="dateCell" slot-scope="{ data }">
                  <p :class="data.isSelected ? 'is-selected' : ''">
                    {{ data.day.split("-").slice(2).join("-") }}
                  </p>
                </template>
              </el-calendar>
            </div>
          </div>

          <!-- 刷题榜单 -->
          <div class="rank">
            <p>刷题榜单</p>
            <ul v-if="users.length != 0">
              <li class="rank1" v-if="users.length >= 1">
                <div>
                  <img src="../../src/assets/problem/rank1.jpg" />
                  <span>{{ users[0].user.username }}</span>
                </div>
                <div>
                  <span>{{ users[0].user.score }}</span>
                </div>
              </li>

              <li class="rank1" v-if="users.length >= 2">
                <div>
                  <img src="../../src/assets/problem/rank2.jpg" /><span>{{
                    users[1].user.username
                  }}</span>
                </div>
                <div>
                  <span>{{ users[1].user.score }}</span>
                </div>
              </li>

              <li class="rank1" v-if="users.length >= 3">
                <div>
                  <img src="../../src/assets/problem/rank3.jpg" /><span>{{
                    users[2].user.username
                  }}</span>
                </div>
                <div>
                  <span>{{ users[2].user.score }}</span>
                </div>
              </li>
              <template v-if="users.length >= 4">
                <li
                  class="rank2"
                  v-for="(item, index) in users.slice(3, 6)"
                  :key="item.id"
                >
                  <div>
                    <span>{{ index + 4 }}</span
                    ><span>{{ item.user.username }}</span>
                  </div>
                  <div>
                    <span>{{ item.user.score }}</span>
                  </div>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { problems } from "../assets/http";
export default {
  props: ["isLogin"],
  data() {
    return {
      nowDate: "",
      value: new Date(),
      leftShow: "block",
      list: [],
      users: [],
      blog: "",
      isSub: 0,
      search: {
        algorithmTag: "",
        dataStructureTag: "",
        gmtCreate: "",
        problemLevel: "",
        gmtCreate: "",
        tag: "",
        title: "",
      },
      userInfo: "",
    };
  },
  watch: {
    isLogin(val) {
      console.log(val, "@@@");
      let userInfo = window.sessionStorage.getItem("user");
      if (userInfo) {
        this.userInfo = JSON.parse(userInfo);
      }
      this.getSubscribe();
    },
    nowDate(val) {
      this.search.gmtCreate = val.toJSON().slice(0, 10);
      this.GetByConditions();
      this.leftShow = "none";
      setTimeout(() => {
        this.leftShow = "block";
      }, 100);
    },
    search: {
      deep: true,
      handler(newVal, oldVal) {
        if (!newVal.gmtCreate) return;
        let flag = true;
        let lock = true;
        Object.keys(newVal).forEach((item) => {
          if (typeof newVal[item] == "object") lock = false;
          if (
            typeof newVal[item] == "string" &&
            newVal[item].replace(/\s+/g, "") != ""
          )
            lock = false;
        });
        if (lock) this.$message("请输入内容");
        Object.keys(newVal).forEach((item) => {
          if (newVal[item] != "") flag = false;
        });
        if (flag) {
          Object.keys(newVal).forEach((item) => {
            if (newVal[item] != "") flag = false;
          });
          if (flag) this.checkAll();
        }
      },
    },
  },
  methods: {
    //展示所有题目
    async checkAll(gmtCreate) {
      console.log(typeof gmtCreate);
      let res = {};
      if (gmtCreate) {
        res = await problems.getByConditions({ gmtCreate });
      } else {
        res = await problems.getAll();
      }
      console.log(this.list);
      this.list = res.dataList;
    },
    //用户排名
    async GetRank() {
      let res = await problems.getRank();
      console.log(res.dataInfo.users, "@");
      this.users = res.dataInfo.users.filter((item) => {
        return item.user.id != "8";
      });
    },
    subscribe() {
      if (!this.isLogin) {
        this.$message.info("请先登录！");
      } else if (!this.isSub) {
        problems
          .setSub({
            flag: 0,
            userId: this.userInfo.id,
          })
          .then(async (res) => {
            console.log(res);
            await this.getSubscribe();
            if (this.isSub) this.$message.success("订阅成功！");
            else {
              this.$message.error("订阅失败！");
            }
          });
      } else {
        problems
          .setSub({
            flag: 1,
            userId: this.userInfo.id,
          })
          .then(async (res) => {
            console.log(res);
            await this.getSubscribe();
            if (!this.isSub) this.$message.success("取消订阅成功！");
            else {
              this.$message.error("取消订阅失败！");
            }
          });
      }
    },
    //提交博客
    async Submit(item) {
      if (this.isLogin) {
        if (item.blog) {
          console.log(this.userInfo, "!!!");
          let res = await problems.getBlog({
            link: item.blog,
            proId: item.id,
            userId: this.userInfo.id,
            proName: item.title,
            groupName: this.userInfo.groupName,
          });
          item.blog = "";
          this.$message(`${res.dataInfo}`);
        } else {
          this.$message("答案不能为空");
        }
      } else {
        this.$message("请先登录");
      }
    },
    //搜索
    async GetByConditions() {
      for (let key in this.search) {
        this.search[key] == "" && delete this.search[key];
      }
      let res = await problems.getByConditions(this.search);
      this.list = res.dataList || [];
    },
    //获取时间
    showData(data) {
      this.search.gmtCreate = data.day;
      this.GetByConditions();
    },
    async getSubscribe() {
      console.log(this.userInfo, "W@@");
      if (this.isLogin) {
        let res = await problems.getSubscribe(this.userInfo.id);
        console.log(res);
        this.isSub = res.dataInfo.status;
      }
    },
    getNowPro() {
      let date = new Date();
      this.nowDate = date;
      this.checkAll(date.toJSON().slice(0, 10));
    },
  },
  mounted() {
    this.getNowPro();
    this.GetRank();
    let userInfo = window.sessionStorage.getItem("user");
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo);
    }
    this.getSubscribe();
    console.log(this.userInfo);
  },
};
</script>

<style lang="less" scoped>
@import url("http://www.ztxztx.top:10086/icon.css");
// 日历选择
.is-selected {
  color: #1989fa;
}
li {
  list-style: none;
}
// 标签
.tag {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px auto;
  & > div {
    background: #494949;
    display: flex;
    justify-content: center;
    align-content: center;
    min-width: 100px;
    width: 180px;
    height: 45px;
    line-height: 45px;
    background: #ffffff;
    border: 1px solid #494949;
    border-radius: 8px;
    margin-right: 44px;
    text-align: center;
    font-size: 18px;
    font-family: Source Han Sans CN;
    color: #494949;
    input {
      width: 80%;
      overflow: hidden;
      border: none;
      text-align: center;
      overflow: hidden;
    }
  }
  i {
    font-size: 30px;
  }
}

// 主体
.problemshow {
  display: flex;
  justify-content: center;
  .main {
    display: flex;
  }
  // 左边
  .left {
    min-width: 650px;
    width: 850px;
    h2 {
      font-size: 30px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #208ec5;
    }
    //  题目展示
    & > div {
      padding: 5px 25px 20px 25px;
      width: 90%;
      margin-bottom: 40px;
      background: #ffffff;
      box-shadow: 3px 2px 6px 2px rgba(77, 76, 76, 0.13);
      border-radius: 10px;
      p {
        span {
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #494949;
        }
      }
    }

    #nosearch {
      height: 100px;
      line-height: 100px;
      text-align: center;
    }

    .el-tag {
      margin-right: 8px;
    }

    .submit {
      position: relative;
      margin-top: 15px;
      border: 1px solid #d5d5d5;

      border-radius: 8px;
      input {
        background: #ffffff;
        border: none;
        height: 40px;
        overflow: hidden;
        text-indent: 10px;
        margin-left: 5px;
      }
      div {
        position: absolute;
        top: 7px;
        right: 7px;
        text-align: center;
        color: #ffffff;
        width: 97px;
        height: 30px;
        line-height: 30px;
        background: #1da9ef;
        opacity: 0.4;
        border-radius: 12px;
      }
    }
  }

  // 右边
  .right {
    margin-left: 50px;
    // 日历
    .time {
      width: 350px;
      .subscribe {
        cursor: pointer;
        margin: 0 auto;
        width: 80px;
        height: 80px;
        line-height: 80px;
        background: radial-gradient(circle);
        border-radius: 50%;
        color: #ffffff;
        text-align: center;
        font-size: 25px;
      }
      .data {
        margin-top: 5px;
        /deep/.el-calendar-day {
          height: 45px;
        }
      }
    }

    // 刷题榜单
    .rank {
      margin: 20px auto;
      box-sizing: border-box;
      width: 290px;
      height: 350px;
      background: #ffffff;
      border: 2px solid #d6d6d6;
      border-radius: 10px;
      padding: 0px 20px;
      p {
        text-align: center;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #1780b5;
        font-size: 22px;
      }
      li {
        display: flex;
        align-items: center;
        margin: 13px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        & > div {
          width: 50%;
          &:first-child {
            display: flex;
            align-items: center;
            span {
              &:first-child {
                width: 27px;
                text-align: center;
              }
              &:last-child {
                margin-left: 20px;
              }
            }
          }
          &:last-child {
            text-align: right;
          }
        }
      }

      .rank1 {
        color: #2e2e2e;
      }
      .rank2 {
        color: #b7b7b7;
      }
    }
  }
}

/* 响应式布局 */
/* 1. 超小屏幕下  <=767 */
@media screen and (max-width: 767px) {
  .tag {
    width: 80%;
    margin: 20px auto;
    padding: 0;
    & > div {
      min-width: 60px;
      margin: 0 auto;
      height: 30px;
      width: 20%;
      font-size: 12px;
    }
  }
  .main {
    .left {
      min-width: 320px;
      & > div {
        padding: 15px;
      }
    }
  }

  .right {
    display: none;
  }
}
/* 2. 小屏幕下  768~992  */
@media screen and (max-width: 992px) {
  .tag {
    width: 80%;
    margin: 20px auto;
    padding: 0;
    & > div {
      min-width: 60px;
      margin: 0 auto;
      height: 30px;
      width: 20%;
      font-size: 12px;
    }
  }
  .main {
    .left {
      min-width: 320px;
      & > div {
        padding: 15px;
      }
    }
  }
}
</style>
