<template>
  <div class="wrapper">
    <div class="nav" ref="nav">
      <p class="tit">专注技术培养</p>
      <div class="center">
        <img src="@/assets/home/line.png" alt="" />
        <img src="@/assets/home/Technical training.png" alt="" />
        <img src="@/assets/home/line.png" alt="" />
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
    <Cultivate :li-index="liIndex"></Cultivate>
  </div>
</template>
<script>
import Cultivate from "./cultivate.vue";

export default {
  components: {
    Cultivate,
  },
  data() {
    return {
      liIndex: 0,
      navLi: [
        { name: "人工智能入门养成", url: "cultivate" },
        { name: "WEB开发实战", url: "practice" },
        { name: "校企联合活动推进", url: "activity" },
        { name: "就业指导规划", url: "jobGuide" },
      ],
    };
  },
  methods: {
    liCli(i) {
      this.liIndex = i;
    },
  },
};
</script>
<style lang="less" scoped>
@import "./style.less";
</style>
