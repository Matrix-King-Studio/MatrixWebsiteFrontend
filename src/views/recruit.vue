<template>
  <div class="content">
    <div class="bg">
      <img src="../assets/recruit/bg.jpg" alt="">
    </div>
    <div class="wrapper">
      <div class="footGroup">
        <img src="../assets/recruit/foot.png" alt="">
        <img src="../assets/recruit/foot2.png" alt="">
      </div>
      
      <div id="laptop" class="animated fadeInDown" @click="open">
        <div id="cover">
          <div>010100011000011 010100011000011 010100011000011</div>
          <div>010100011000011 010100011000011 010100011000011</div>
          <div>010100011000011 010100011000011 010100011000011</div>
          <div>010100011000011 010100011000011 010100011000011</div>
        </div>
        <img src="../assets/recruit/laptop.png" alt="" >
      </div>
      <div class="footGroup2">
        <img src="../assets/recruit/foot2.png" alt="">
        <img src="../assets/recruit/foot.png" alt="">
      </div>
    </div>
    <div class="bottom">欢迎扫描下方二维码，加入MATRIX交流服务QQ群</div>
    <div class="pop" v-if="pop">
      <div class="off" @click="off">X</div>
      <iframe height="100%" width="102%"  src="https://www.wjx.top/vm/rXjXGTR.aspx" frameborder="0"></iframe>
    </div>
  </div>
  
</template>
<script>
export default {
  data(){
    return{
      pop:false
    }
  },
  methods:{
    open(){
      this.pop=true
    },
    off(){
      this.pop=false
    }
  }
}
</script>
<style lang="less" scoped>
  .pop{
    overflow: hidden;
    z-index: 9999;
    position: fixed;
    top: 15%;
    left: 50%;
    transform: translate(-50%,0);
    height: 80%;
    width: 50%;
    .off{
      right: 20px;
      user-select: none;
      top: 10px;
      font-size: 20px;
      font-weight: 600;
      position: absolute;
    }
  }
  .content{
    width: 100%;
    overflow: hidden;
  }
  .bottom{
    padding: 10px 0;
    background-color: #474646;
    color: white;
    text-align: center;
    width: 100%;
  }
  .wrapper{
    background-size: 100% 100%;
    height: 90vh;
    width: 100vw;
    >div{
      position: absolute;
      top: 30%;
      display: flex;
      flex-direction: column;
      width: 150px;
      img{
        width: 120px;
      }
    }
    > :nth-child(1){
      left: 5%;
      :nth-child(2){
        transform: translateX(100%);
      }
    }
    .footGroup2{
      right: 10%;
      :nth-child(1){
        
        transform: translateX(100%);
      }   
    }
  }

  .bg{
    position: absolute;
    width: 100%;
    z-index: 0;
    overflow: hidden;
    background: url('../assets/recruit/bg.jpg');
    
    background-size:100% 100%;
    >img{
      width: 100%;
      height: 99.3vh;
      animation: bg 15s linear infinite alternate;
    }
  }
  @keyframes bg {
    0%{
      transform: scale(1);
    }

    100%{
      transform: scale(1.2) translateX(100px);
    }
  }
  @keyframes text {
    0%{
      left: 100%;
      transform: translate(0,0);
    }
    100%{
      left: 0;
      transform: translate(-100%,0);
    }
  }
  @keyframes text2 {
    100%{
      left: 100%;
      transform: translate(0,0);
    }
    0%{
      left: 0;
      transform: translate(-100%,0);
    }
  }

  #laptop{
    position: absolute;
    left: 50%;
    top: 50%;
    
    #cover{
      width: 380px;
      position: absolute;
      left: 0;
      transform: translate(-50%,-50%);
      top: 0;
      overflow: hidden;
      opacity: .2;
      z-index: 999;
      height: 90%;
      >div{
        white-space: nowrap;
        position: absolute;
        color:white;
        animation: text 10s infinite linear;
      }
      > :nth-child(1){
        
        top: 20%;
      }
      > :nth-child(2){
        animation-delay: 1s;
        left: 100%;
        top: 30%;
      }
      > :nth-child(3){
        animation: text2 10s infinite linear;
        left: 100%;
        top: 40%;
      }
      > :nth-child(4){
        left: 100%;
        animation-delay: 1s;
        top: 50%;
      }
    }
    img{
      width: 500px !important;
      transform: translate(-50%,-50%);
      height: auto;
    }
  }

  @media screen and (max-width: 1050px) {
    .pop{
      width: 90%;
    }
    .footGroup2{
      display: none !important;
    }
    .footGroup{
      display: none !important;
    }

  }
  @media screen and (max-width: 700px) {
    #laptop>img{
      width: 80vw !important;
    }
    #cover{
      width: 60vw !important;
    }

  }
</style>