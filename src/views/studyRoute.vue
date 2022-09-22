<template>
  <div class="wrapper">
    <div class="left animated fadeInLeft">
      <div class="li" :class="i==index?'active':''" v-for="(item,index) in leftLi" @click="leftCli(item,index)" :key="item.groupName">
        {{item.groupName}}
      </div>
    </div>
    <div class="right">
      <div class="top animated fadeInDown">
        <div :class="j==1?'actives':''" @click="modSwap(1)">
          <div>入门</div>
          <div></div>
        </div>
        <div :class="j==2?'actives':''" @click="modSwap(2)">
          <div>进阶</div>
          <div></div>
        </div>
        <div :class="j==3?'actives':''" @click="modSwap(3)">
          <div>高级</div>
          <div></div>
        </div>

      </div>
      <transition name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <div class="bottom" v-if="mod!=''" ref="bottom" :style="{justifyContent:'flex-start'}">
          <div v-for="(item,index) in mod" class="li" :key="item.moduleName">
            <div class="label">第{{index+1}}模块</div>
            <div class="name">{{item.moduleName}}</div>
            <hr>
            <div class="des">目标：{{item.moduleDescribe}}</div>
            <div class="liBottom">
              <div class="date">目标时间：{{item.moduleDays}}天</div>
              <div class="button">学习链接</div>
              <div class="buttonwrap">
                <div v-if="item.learnPointVOList!=''" >
                  <div v-for="(jtem,j) in item.learnPointVOList" @click="url(jtem)" :title="jtem.pointType+':'+jtem.pointName" :key="j">
                    {{jtem.pointType}}：{{jtem.pointName}}
                  </div>
                </div>
                <div v-else style="text-align: center;">暂无数据</div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div v-if="this.mod==''">暂无数据</div>
      
    </div>
  </div>
</template>
<script>
import {studyRouteAPI as http}  from '../assets//http' 
export default {
  data(){
    return{
      flex:'space-around',
      i:-1,
      j:1,
      leftLi:[
        {groupName:'暂无组别'}
      ],
      data:{},
      mod:[]
    }
  },
  watch:{
    mod:{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        if(val.length%3==2 ||  val.length==2){
          this.flex='space-around'
        }else{
          this.flex='space-between'
        }
      }
    }
  },  
  methods:{
    url(data){
      window.open(data.pointLink,'_blank')
    },
    modSwap(index){
      this.j=index
      this.mod=[]
      setTimeout(() => {
        this.data.dataList.forEach((el) => {
          if(el.moduleLevel==index) this.mod.push(el)
        });
        if(!this.mod){
          this.$refs.bottom.style.display='none'
        }    
      }, 100);

    },
    test(){
      this.mod=[]
    },
    async leftCli(item,i){
      console.log(item);
      this.j=1
      this.i=i
      let res=await http.getRoute(item.id)
      this.data=res
      this.mod=[]
      setTimeout(() => {
        this.data.dataList.forEach((el) => {
          if(el.moduleLevel==1) this.mod.push(el)
        });
        console.log(this.mod);        
      }, 100);

    },
  },
  mounted:async function(){
    let res=await http.getgroup()
    this.leftLi=res.dataList
    this.i=0
    res=await http.getRoute(res.dataList[0].id)
    this.data=res
    this.data.dataList.forEach((el) => {
      if(el.moduleLevel==1) this.mod.push(el)
    });
    console.log(this.mod);
  }
}
</script>
<style lang="less" scoped>
  .right{
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 1200px;
    width: 60%;
    margin: 0 auto;
    .top::after{
      content: '';
      width: 94%;
      left: 3%;
      border-top: 5px solid #c3c3c3;
      position: absolute;
      bottom: 30px;
    }
    .top{
      height: 95px;
      position: relative;
      font-size: 30px;
      display: flex;
      width: 100%;
      justify-content: space-between;
      .actives{
        > :nth-child(1){
          color: #2386b9;
        }
        > :nth-child(2){
          z-index: 99;
          background-color: #2386b9;
        }
      }
      >div{
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      >div>div:nth-child(2){
        margin-top: 10px;
        border-radius: 50%;
        width: 25px;
        height: 25px;
        background-color: #c3c3c3;
      }
    }
    .bottom{
      width: 100%;
      transform: translateY(-20px);
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      
      .li{
        box-sizing: border-box;
        padding: 10px;
        padding-top: 20px;
        margin-top: 30px;
        width: 30%;
        border: 2px solid #d9d8d8;
        border-radius: 20px;    
        height: 320px;
        margin: 30px 10px 0;
        
        position: relative;
        .label{
          position: absolute;
          width: 30%;
          top: 5px;
          color: white;
          height: 30px;
          line-height: 25px;
          text-align: center;
          text-indent: 1em;
          right: -8px;
          background: url('../assets//studyRoute/com.png') no-repeat;
          background-size: 100% 100%;
        }
        .name{
          font-weight: bold;
          text-align: left;
          font-size: 25px;
          color: #343434;
          line-height: 53px;
          letter-spacing: -1px;
          margin-bottom: 15px;
        }
        .des{
          margin-top: 20px;
          overflow: auto;
          height: 50%;
          padding: 0 10px;
        }
        .des::-webkit-scrollbar {
        /*滚动条整体样式*/
        width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
        }
        .des::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
        background   : rgba(0, 0, 0, 0.2);
        }
        .des::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background   : #ededed;
        }
        .liBottom{
          display: flex;
          color: #343434;
          position: absolute;
          bottom: 20px;
          width: 94%;
          justify-content: space-between;
          align-items: center;
          .button{
            padding: 2px 10px;
            border: 2px solid #d9d8d8;            
            color: #555555;
            border-radius: 18px;  
            height: 50%;       
            margin-right: 2px;  
            z-index: 110; 

          }
          .button:hover+.buttonwrap{
            display: flex;
          }
          .buttonwrap:hover{
            display: flex;
          }
          .buttonwrap{
            display: none;
            top: 0px;
            padding-top: 30px;
            position: absolute;
            right: -10px;
            width: 90%;
            >div>div:hover{
              color: #2386b9;
            }
            >div>div{
              overflow: hidden;
              height: 21px;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            >:nth-child(1){
              
              padding: 5px;
              width: 100%;
              z-index: 99;
              background-color: #ffffff;
              border: 1px solid #d9d8d8;
              border-radius: 10px;
              color: #555555;
              >div{
                margin-bottom: 2px;
              }
            }
          }
          .button:hover{
            background: #2386b9;
            color: white;
          }
        }

      }
    }
  }
  .active{
    background-color: #05486c;
    color: white;
  }
  .wrapper{
    min-height: 600px;
    margin-bottom: 300px;
  }
  .left:hover>.li{
    background-color: white;
    color: black;     
  }
  .left{
    position: fixed;
    z-index: 999;
    top: 100px;
    left: 10px;
    background-color: #fff;
    width: 15%;
    color: black;
    text-align: center;
    border-radius: 5px;
    border: 1px solid #bdbdbd;
    .li{
      transition: background-color .2s;

      padding: 10px 0;
      
      border-bottom: 1px solid #bdbdbd;
    }
    .li:hover{
      background-color: #05486c;
      color: white;      
    }

  }

  @media screen and (max-width: 767px) {
    .right{
      .top::after{
        content: '';
        width: 80%;
        left: 10%;
        border-top: 5px solid #c3c3c3;
        position: absolute;
        bottom: 45px;
      }
      .top{
        font-size: 20px;
      }
      .bottom{
        width: 120% !important;
        .li{
          width: 100%;
        }
        .buttonwrap{
          width: 100% !important;
          left: 0;
          >:nth-child(1){
            width: 120%;
          }
        }
        .name{
          font-size: 20px !important;
        }
      }

    }
  } 
    /* 2. 小屏幕下  768~992  */
  @media screen and (max-width: 1100px) {
    .right{
      .bottom{
        .li{
          width: 110% !important;
        }

      }
    }
  }
  @media screen and (max-width: 1440px) {
    .right{

        .bottom{
          .li{
            width: 45% ;
          }
        }
      }
  }
</style>