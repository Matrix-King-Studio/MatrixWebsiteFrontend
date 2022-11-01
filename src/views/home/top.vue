<template>
  <div class="wrapper">
    <div class="top" ref="top">
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      topText: `Matrix工作室是由天津科技大学人工智能学院的一群编程爱好者组成的，大家志同道合，相互鞭策，一起努力变得更优秀。Matrix工作室分为四个组，分别是AI组、IOS组、前端组、后端组。同时，每个组都有各组组长精心设计好的学习路线和学习资料，每隔一断时间都会调整。
          在这里，学长学姐们会毫无保留将自己的学习经验和面试实习经验传授给学弟学妹们，来帮助
          热爱编程、热爱学习的人工智能学子得到更好的资源，方便以后的实习就业。同时，matrix工作室
          也会开展各种讲座，邀请优秀的学长学姐与同学们交流。`,
    };
  },
};
</script>
<style lang="less" scoped>
@import "./style.less";
</style>
