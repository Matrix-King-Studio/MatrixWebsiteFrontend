<template>
  <div class="wrapper">
    <div class="right animated fadeInUp">
      <div class="li" v-for="(item, index) in project">
        <img :src="item.image" alt="" />
        <div class="mid">
          <div class="name">{{ item.projectName }}</div>
          <div class="date">{{ item.gmdCreate }}</div>
        </div>
        <div class="des">{{ item.projectDescribe }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { project } from "../assets/http";
export default {
  mounted: function () {
    project.getProject().then((res) => {
      this.project = res.dataList;
    });
  },
  data() {
    return {
      project: [
        // {
        //   image:require('../assets/project/projectBg.png'),
        //   projectName:'项目一',
        //   projectDescribe:'项目简介项目简介项目简介项目简介项目简介项目简介',
        //   gmdCreate:'2021/08/01'
        // }
      ],
    };
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  margin-top: 5px;
}
.left {
  position: fixed;
  z-index: 999;
  top: 100px;
  left: 10px;
  border: rgb(200, 200, 200) 1px solid;
  width: 15%;
  color: black;
  text-align: center;
  border-radius: 5px;
  background-color: white;
  .li {
    padding: 10px 0;
    border-bottom: 1px solid rgb(200, 200, 200);
  }
}
.right {
  min-height: 1200px;
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;

  .li {
    box-shadow: 0px 1px 10px 5px rgba(50, 50, 50, 0.2);
    overflow: hidden;
    border-radius: 20px;
    width: 23%;
    margin: 10px 10px;
    height: 400px;
    background-color: white;
    .mid {
      display: flex;
      margin: 20px 10px;
      justify-content: space-between;
      align-items: center;
    }
    .des {
      padding: 10px;
      color: rgb(150, 150, 150);
    }
    img {
      width: 100%;
      height: 200px;
    }
    .name {
      font-size: 20px;
    }
    .date {
      color: rgb(181, 181, 181);
    }
  }
}
@media screen and (max-width: 680px) {
  .left {
    background: rgba(255, 255, 255, 0.5);
    > .li {
      opacity: 0.8 !important;
    }
  }
  .right {
    width: 90%;
    .li {
      height: 400px !important;
      img {
        height: 50%;
      }
    }
  }
}
/* 2. 小屏幕下  768~992  */
@media screen and (max-width: 800px) {
  .right {
    .li {
      width: 100% !important;
      height: 600px;
      img {
        height: 50%;
      }
    }
  }
}
@media screen and (max-width: 1440px) {
  .right {
    justify-content: space-between;
    .li {
      width: 45%;
    }
  }
}
</style>
