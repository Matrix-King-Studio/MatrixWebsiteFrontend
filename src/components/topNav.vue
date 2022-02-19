<template>
  <div class="wrapper" :style="'position:'+position +';'" ref="wrapper">
    <div class="phone">
      <div class="el-icon-s-grid left" @click="show=true"></div>
      <div class="text">{{urlName}}</div>
      <van-popup v-model="show" position="right" style="height: 100% ;width: 40%">
        <div id="pup">
          <router-link v-for="(item, i) in navLi"  :to="item.url"  tag="a"
          @click.native="liCil2(item.url)"
          >
            {{item.name}}
          </router-link>
        </div>

      </van-popup>
      <img 
      :style="islogin==0?'filter: grayscale(100%)':''"
      @click="login" src="../assets/top/camera.png" class="right" alt="">
    </div>

    <img class="logo" @click="test" src="../assets/top/logo.png"
    
    ></img>


    <div class="ul cp"  @mouseleave="leave()">

      <div class="liBg" ref="x"></div>

      <router-link v-for="(item, i) in navLi" :key="i"  class="head-left-menu" tag="a"
        :to="item.url"   @mouseenter.native="trans(i)"  @click.native="liCil(i,item.url)" :style="{color: '#788187'}">
        {{item.name}}
      </router-link>
      


    </div>
    <div></div>
    <img src="../assets/top/camera.png"
    
    @click="login" class="camera" alt="" :style="islogin==0?'filter: grayscale(100%)':''">
  </div>
</template>
<script>

export default {
  props:['islogin'],
  data(){
    return{
      lock:0,
      show:false,
      height:'70',
      opacity:'1',
      position: 'absolute',
      url:'home',
      urlName:'首页',
      color:['#f5cfa8','#edb8c2','#afa7ce','#a7d6ea','#c2dcb9','#eeecbc'],
      navLi:[
        {name:'首页',url:'home'},
        {name:'项目广场',url:'project'},
        {name:'学习路线',url:'studyRoute'},
        {name:'公共资源',url:'resource'},
        {name:'留言板',url:'msgboard'},
        {name:'招贤纳士',url:'recruit'}
      ]
    }
  },
  watch:{
    url(val){
      this.navLi.forEach(el => {
        if(val==el.url) this.urlName=el.name
      });
    },
    $route(val){
      
      if(val.name=='news'){
        this.urlName='新闻'
      }
    }
  },
  mounted(){
    // 刷新页面导航BUG修复
    this.navLi.forEach((el,i) => {
      if(el.url==this.$route.path.replace('/','')){
        this.url=el.url
        this.$refs.x.style.left=2.1+16.7*i+"%"
        this.setColor(i)
      }
    })
    // 动画效果
    window.addEventListener('scroll',this.handleScrolls,true)
  },
  beforeDestroy(){
    window.removeEventListener('scroll',this.handleScroll)
  },
  methods:{
    login(){
      this.$emit('login', 1);
    },
    leave(){
      // bug修复
      setTimeout(()=>{
        this.navLi.forEach((el,i) => {
          if(el.url==this.url){
            this.$refs.x.style.left=2.1+16.7*i+"%"
            this.setColor(i)
          }
        })
      },100)
    },
    handleScrolls(){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if(scrollTop>=120){
        this.position='fixed'
        this.$refs.wrapper.classList.add("animated","fadeInDown","shadow")

      }
      if(scrollTop==0){
        this.$refs.wrapper.classList.remove("animated","fadeInDown","shadow")
        this.position='absolute'
      }
    },
    test(){

    },
    handleScroll(e){

    },
    liCil2(url){
      this.url=url
      this.show=false
      if(url =='resource' ) {
        alert('敬请期待！')
      }
    },
    liCil(e,url){
      // this.$router.push({name:url})
      this.url=url
      console.log(url);
      
      if(url =='resource') 
      {
        alert('敬请期待！')
        this.url='home'
        setTimeout(()=>{
          this.$refs.x.style.left=2.1+16.6*0+"%"
          
        },2000)
        
        return
      }
      
      console.log('123');
      this.$refs.x.style.left=2.1+16.6*e+"%"
      
    },
    // 导航动画
    trans(e){
      setTimeout(()=>{this.$refs.x.style.width="12%";this.$refs.x.style.transform="translateX(0)"},400)
      setTimeout(()=>{this.$refs.x.style.left=2.1+16.7*e+"%"},100)
      setTimeout(()=>{this.$refs.x.style.width="4%";this.$refs.x.style.transform="translateX(50%)";this.setColor(e)},10)
    },
    setColor(i){
      this.$refs.x.style.backgroundColor=this.color[i]
    }

  }
}
</script>
<style lang="less" scoped>
.shadow{
  box-shadow:0px 5px 2px 0px rgba(50, 50, 50, 0.2);
}
.liBg{

  transition: all .5s;
  height: 32px;
  background-color: #f5cfa8;
  width: 12%;
  border-radius: 10px;
  left: 2.1%;
  top: 14px;
  z-index: 1;
  position: absolute;
}
#pup{
  display: flex;
  flex-direction: column;
  text-align: center;
  box-sizing: border-box;
  padding-top: 10px;
  a{
    color: black;
    margin-bottom: 10px;
  }
}
img{
  margin: 0 5%;
}
.wrapper{
  left: 0;
  top: 0;
  height: 77px;
  z-index: 999;
  width: 100%;
  background-color: white;
  align-items: center;
  display: flex;
  justify-content: center;
}
.logo{
  width: 40px;
  height: 46px;
}
.camera{
  width: 40px;
  height: 40px;
  transform: translateY(5px);
}
.ul{
  position: relative;
  background-image: url('../assets/top/bg.png');
  background-size: 100% 100%;
  display: flex;
  justify-content: space-around;
  width: 50%;
  .li{
    z-index: 99;
    line-height: 55px;
  }
}
.head-left-menu {
  position: relative;
  z-index: 22;
  cursor: pointer;
  font-size: 14px;
  color: #788187;
  border-radius: 10px;
  padding: 10px 0;
  text-decoration: none;
  text-align: center;
  box-sizing: border-box;
  width: 90px;
  height: 40px;
  margin: 10px 0 0 0;
}
.phone{
  z-index: 999;
  background-color: white;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  display: none;
  justify-content: space-between;
  padding: 0 20px;
  .text{
    transform: translateX(1.5em);
  }
  .left{
    width: 20px;
    font-size: 30px;

  }
  .right{
    width: 35px;

  }
}
/* 响应式布局 */
/* 1. 超小屏幕下  <=767 */
@media screen and (max-width: 767px) {
  .ul{
    width: 100%;
    opacity: 0;
  }
  .phone{
    display: flex;
  }
  .wrapper{
    opacity: .8 !important;
  }
  .camera{
    display: none;
  }
  .logo{
    display: none;
  }
}
/* 2. 小屏幕下  768~992  */
@media screen and (max-width: 992px) {
  .ul{
    width: 100%;
  }

}
</style>