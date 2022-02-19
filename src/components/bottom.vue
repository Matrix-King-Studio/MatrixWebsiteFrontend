<template>
  <div class="wrapper" ref="wrapper" style="opacity:0;">

    <div class="left">
      <div class="top" >
        <div>
          CONTACT
        </div>
        <div>
          商务合作
        </div>
      </div>

      <div class="bottom" >
        <div>
          <img src="../assets/bottom/postion.png" alt="">
          <div>
            <div>ADDRESS</div>
            <div>
              天津市滨海新区第十三大街29号天津科大学
            </div>
          </div>
        </div>

        <div>
          <img src="../assets/bottom/email.png" alt="">
          <div>
            <div>E-MAIL</div>
            <div>matrix2021@163.com</div>
          </div>
        </div>

        <div>
          <img src="../assets/bottom/tel.png" alt="">
          <div>
            <div>TEL</div>
            <div>15122544816</div>
          </div>
        </div>

        <div style="transform: translateX(3px);">
          <img src="../assets/bottom/qq.png" alt="">
          <div>
            <div>QQ</div>
            <div>1099054520</div>
          </div>
        </div>

      </div>
    </div>

    <div class="right" ref="right">
      <img src="../assets/bottom/scan.png" alt="">
      <div>matrix studio 交流服务器群</div>
    </div>

  </div>
</template>
<script>
import {animate} from '@/assets/isViewPort'
export default {
  data(){
    return{}
  },
  mounted(){
    window.addEventListener('scroll',this.handleScroll,true)
    this.handleScroll()
  },
  beforeDestroy(){
    window.removeEventListener('scroll',this.handleScroll)
  },
  methods:{
    handleScroll(){
      animate(this.$refs.wrapper,'fadeIn')


    }
  },
}
</script>
<style lang="less" scoped>
  .wrapper{
    justify-content: center;
    display: flex;
    height: 390px;
    color: white;
    background-color: #666666;
  }
  .left,.right{
    width: 30%;
  }
  .left{
    .top{
      margin: 50px 0;
    }
    .bottom{
      width: 100%;
      display: flex;
      font-size: 12px;
      flex-wrap: wrap;
      justify-content: space-around;
      > div{
        width: 46%;
        margin-bottom: 20px;
        display: flex;
        img{
          transform: translateY(5px);
          margin-right: 20px;
          width: 20px;
          height: 25px;
        }
        > div{
          > :nth-child(2){
            margin-top: 5px;
            padding-top: 5px;
            border-top: 1px solid white;
          }
        }
      }
      > :nth-child(2){
        img{
          width: 25px;
          height: 20px;          
        }
      }
    }
  }
  .right{
    justify-content: center;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
      margin-bottom: 25px;
    }
  }
/* 响应式布局 */
/* 1. 超小屏幕下  <=767 */
@media screen and (max-width: 767px) {
  .left{
    margin-left: 1%;
    width: 79% !important;
    display: none;
  }
  .right{
    width: 20%;
  }
}
/* 2. 小屏幕下  768~992  */
@media screen and (max-width: 992px) {
  .left,.right{
    width: 45%;
  }
}  
</style>