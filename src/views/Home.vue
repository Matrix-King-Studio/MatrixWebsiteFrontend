<template>
  <div class="wrapper">
    <div ref="top">
      <Top></Top>
    </div>
    <div ref="mid">
      <Mid></Mid>
    </div>
    <div ref="floatImg">
      <FloatImg></FloatImg>
    </div>
  </div>
</template>

<script>
import { animateAdd, animateInit, animateDesotry } from "smooth-animate";
import Mid from "./home/mid.vue";
import Top from "./home/top.vue";
import FloatImg from "./home/floatImg.vue";
import News from "./home/news.vue";

export default {
  name: "Home",
  components: {
    Top,
    Mid,
    FloatImg,
    News,
  },
  data() {
    return {};
  },
  mounted() {
    animateAdd(this.$refs.top);
    animateAdd(this.$refs.floatImg);
    animateAdd(this.$refs.news);
    animateAdd(this.$refs.mid);
    animateInit();
  },
  beforeDestroy() {
    animateDesotry();
  },
  methods: {},
};
</script>
<style lang="less" scoped>
@import "./home/style.less";
</style>
