<template>
  <div class="wrapper animated fadeInUp">
    <div style="width: 100%; height: 10px"></div>
    <div class="wrapper2">
      <div class="top">
        <div class="topInfo">
          <img src="../assets/top/camera.png" alt="" />
          <div class="name">{{ name }}</div>
          <div class="send" @click="send">发布</div>
        </div>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="写点什么吧~"
          v-model="msg"
        ></textarea>
      </div>
      <div class="bottom">
        <div class="li" v-for="(item, index) in li">
          <div class="topInfo">
            <img src="../assets/top/camera.png" alt="" />
            <div class="name">{{ item.author }}</div>
          </div>
          <div class="msg">{{ item.message }}</div>
        </div>
        <div class="noComment" v-if="li.length == 0">暂无评论</div>
      </div>
    </div>
  </div>
</template>
<script>
import { msgBoard as http } from "../assets/http";
export default {
  methods: {
    async send() {
      let id = window.sessionStorage.getItem("id");
      if (id) {
        let name = window.sessionStorage.getItem("username");
        let data = await http.send(id, this.msg);
        this.msg = "";
        let li = await http.getList();
        this.li = li.dataList;
        alert("发送成功");
      } else {
        alert("请先登陆！");
      }
    },
  },
  data() {
    return {
      li: [],
      name: "游客",
      msg: "",
    };
  },
  mounted: async function () {
    let li = await http.getList();
    this.li = li.dataList;
    this.name = window.sessionStorage.getItem("username");
  },
};
</script>
<style lang="less" scoped>
textarea {
  cursor: text;
}
.noComment {
  text-align: center;
  color: #757575;
  padding: 20px 0;
}
.wrapper {
  background-image: url("../assets/msgboard/bg.jpg");
  background-position: 0 0;
  background-size: 100% 100%;
  position: relative;
  padding: 40px 0;
  margin-bottom: -10px;
  .bg {
    width: 100%;
  }
}
.wrapper2 {
  width: 100%;
  height: 100%;

  > .top {
    background-color: white;
    width: 90%;
    margin: 0 auto;
    margin-top: 40px;
    border-radius: 10px;
    padding: 40px 20px;
    textarea {
      resize: none;
      width: 90%;
      margin-left: 3%;
      border-radius: 20px;
      background-color: #ededee;
      border: none;
      padding: 20px;
      font-size: 20px;
      margin-top: 10px;
    }
  }
  > .bottom {
    background-color: white;
    width: 90%;
    margin: 0 auto;
    margin-top: 40px;
    border-radius: 10px;
    padding: 40px 20px;
    .li {
      margin-top: 20px;
      .msg {
        background-color: #e9eced;
        padding: 30px;
        border-radius: 20px;
        width: 80%;

        margin: 0 auto;
      }
    }
    .sendInput {
      background-color: #e3e8e9;
      cursor: text;
      border: none;
      padding: 10px;
      border-radius: 50px;
      width: 94%;
      margin-left: 2%;
      margin-top: 20px;
    }
  }
}
.topInfo {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    margin-right: 20px;
  }
  .name {
    font-weight: 600;
    margin-right: auto;
  }
  .send {
    background-color: #ebfafe;
    padding: 10px 20px;
    border-radius: 40%;
  }
}
@media screen and (max-width: 700px) {
  .top,
  .bottom {
    box-sizing: border-box;
    textarea,
    input {
      margin: 0 !important;
      transform: translate(-1%, 5%);
    }
  }
}
</style>
