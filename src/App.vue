<template>
  <div id="app">
    <div class="topNavSite"></div>
    <topNav @login="loginShow=true"
    :islogin='islogin'></topNav>
    <router-view></router-view>
    <div class="popLogin" v-if="loginShow">
      <div class="window">
        <div>
          <input type="text" v-model="info.username">
        </div>
        <div>
          
          <input type="password" v-model="info.password">
        </div>
        <div class="login" @click="login">登录</div>
        <div class="off"
        @click="loginShow=false">X</div>
      </div>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
import topNav from './components/topNav.vue'
import bottom from './components/bottom.vue'
import {login} from './assets/http'
export default {
  name: 'app',
  components: {
    topNav,
    bottom
  },
  mounted:function(){
    if(window.sessionStorage.getItem('id')){
      this.islogin=1
    }else{
      window.sessionStorage.setItem('username','游客')
    }
  
  },
  methods:{
    async login(){
      let data=await login.login(this.info)
      if(data.dataInfo){
        window.sessionStorage.setItem('id',data.dataInfo.id)
        window.sessionStorage.setItem('username',data.dataInfo.username)
        alert('登陆成功！')
        this.islogin=1
        this.loginShow=false
      }else{
        alert('密码或账号错误！')
      }
    }
  },
  data() {
    return {
      info:{
        "password": "",
        "username": ""
      },
      loginShow: false,
      islogin:0
    };
  },
}
</script>

<style lang="less" scoped>
  .popLogin{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 999;
    top: 0;
    left: 0;
    .window{

      position: fixed;
      width: 400px;
      height: 300px;
      transform: translate(-50%,-50%);
      top: 50%;
      left: 50%;
      background-color: white;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .login{
        margin-top: 20px;
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;        
        padding: 12px 40px;
        transition: .1s;
        font-weight: 500;
        font-size: 14px;
        border-radius: 4px;
      }
      > :nth-child(1){
        margin-top: 70px;
      }
      > :nth-child(1)::before{
        content: '学号:';
        position: absolute;
        transform: translate(-120%,50%);
      }
      > :nth-child(2)::before{
        content: '密码:';
        position: absolute;
        transform: translate(-120%,50%);
      }
      > :nth-child(2){
        margin-top: 40px;
      }
      input:focus{
        outline: none;
        border-color: #409eff;
      }
      input{
        cursor: text;
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: none;
        padding: 0 15px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);        
      }
      .off{
        position: absolute;
        right: 20px;
        color: #afafaf;
        font-weight: 600;
        font-size: 20px;
        top: 10px;
      }
      
    }

  }
  .topNavSite{
    height: 75px;
  }
  body,html{
    width: 100%;
    background-color: rgb(250, 250, 250);
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0 auto;
    background-color: white;
    width: 100%;
    max-width: 2000px;
  }
  *{
    margin: 0;
    padding: 0;
    cursor: default;
  }
  p{
    margin: 0;
  }
  /* 指针为手指 */
  .cp{
    cursor: pointer;
  }
    body::-webkit-scrollbar {
    /*滚动条整体样式*/
    width : 15px;  /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
    }
    body::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
    background   : rgba(0, 0, 0, 0.2);
    }
    body::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background   : #ededed;
    }
</style>
