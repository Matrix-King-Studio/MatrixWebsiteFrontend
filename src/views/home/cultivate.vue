<template>
  <div class="wrapper">
      <div class="top" ref="top" style="opacity: 0;">
        <div class="section" v-if="liIndex==0">
          <p>人工智能</p>
          <P>———</P>
          <P>ARTIFICIAL INTELLIGENCE</P>
          <div class="text">
            人工智能是研究、开发用于模拟、延伸和扩展人的智能的理论、方法、技术及应用系统的一门新的技术科学。人工智能是对人的意识、思维的信息过程的模拟。人工智能不是人的智能，但能像人那样思考、也可能超过人的智能。
            人工智能目前有六大研究方向，涉及到计算机视觉、自然语言处理、机器人学、自动推理、机器学习和知识表示
            在学习之前需要掌握一定的python编程基础，方便跟进学习路线以及算法部分的练习。详细的学习内容参考Matrix工作室学习路线。
          </div>
        </div>
        <div class="section" v-if="liIndex==1">
          <p>WEB开发实战</p>
          <P>———</P>
          <P>WEB DEVELOPMENT</P>
          <div class="text">
            WEB前端开发：Web应用被分类归为分布式应用，一般是客户端——服务器结构，所以我们有一部分的代码运行在客户端，另一部分代码运行在服务器。那些在客户端上的应用就是前端，通常指的就是我们的浏览器。最常用于前端开发的技术是HTML+CSS+JavaScript，高级的前端开发人员通常使用这些技术的组合开发应用的前端，另一个前端的常用技术就是使用Photoshop设计，配合其他技术共同完成Web页面的制作。WEB后端开发：后端开发者编写那些运行在服务器上的代码，通常来说，这部分的工作需要和数据库打交道，比如读写数据、读写文件、实现业务逻辑等。有些时候，业务逻辑存储在客户端，这时后台就是用来以Web服务的形式提供数据库中的数据。后端开发者一般需要掌握一种Web编程语言和一个数据库管理系统。详细的学习内容参考Matrix工作室学习路线。         
          </div>
        </div>
        <div class="section" v-if="liIndex==2">
          <p>校企联合培训</p>
          <P>———</P>
          <P>SCHOOLS AND ENTERPRISES</P>
          <div class="text">
            Matrix工作室联合操作系统教学团队，于2021年3月29日组织相关师生代表前往天津麒麟软件有限公司参观研学。参观活动由操作系统主讲教师梁倩、双创中心指导教师李岩带队。
            卡雷尔杯“编程之星--算法挑战赛”由天津卡雷尔机器人技术有 限公司和人工智能学院主办，学院创新创业实践中心和 Matrix 工作 室承办，通过炫酷的赛题设置，自由的选题方式，致力于让参赛选手 充分感受算法设计和代码书写的魅力，通过比赛增强实战实践和沟通 协作能力。
            这学期我们将与企业合作开展iOS俱乐部，让同学们更好的了解iOS系统。          
          </div>
        </div>
        <div class="section" v-if="liIndex==3">
          <p>就业指导计划</p>
          <P>———</P>
          <P>CAREER PLANNING</P>
          <div class="text">
            Matirx工作室成立以来，有许多优秀的学长学姐经过不懈的努力，在毕业后，进入了大厂工作。他们在毕业工作时，也不忘回来为人工智能学院学子传授上学时的学习以及面试就业经验，让学弟学妹们不会走那么多弯路，找到一份满意的工作。Matrix工作室每年都会邀请许多优秀的学长学姐以及行业大佬为同学们进行就业指导。通过这些就业指导，培养学生的就业意识，提升学生的就业技能。针对社会需要， 在日后的学习生活中 进一步加强对自我的完善，更好地充实自己， 提高自己的综合素质和综合能力。      
          </div>
        </div>
      </div>
    <div class="center" ref="mid" style="opacity: 0;">
      <img src="../../assets/home/cultivate/bttom.png" alt="" class="huawei">
      <img src="../../assets/home/cultivate/r.png" alt="" class="r">
      <img src="../../assets/home/cultivate/l.png" alt="" class="l">
      <img src="../../assets/home/cultivate/lt.png" alt="" class="lt">
      <img src="../../assets/home/cultivate/rb.png" alt="" class="rb">
      <img src="../../assets/home/cultivate/t.png" alt="" class="t">
      <img src="../../assets/home/cultivate/b.png" alt="" class="b">

    </div>

    <div class="bottom" ref="bottom" style="opacity: 0;">

      <div class="tit">
        <p>新闻中心</p>
        <div>
          <img src="../../assets/home/cultivate/line.png" alt="">
          <img src="../../assets/home/cultivate/News Center.png" alt="">
          <img src="../../assets/home/cultivate/line.png" alt="">
        </div>
      </div>

      <div class="newsSection">

        <div class="left" @click="newsGo(newsCenter.left.id)" >
          <img :src="newsCenter.left.picture" alt="">
          <div class="tit">
            {{newsCenter.left.title}}
          </div>
          <div class="content" >
            <!-- {{newsCenter.left.message}} -->
          </div>
        </div>

        <div class="right">
          <div v-for="(item,index) in newsCenter.right" @click="newsGo(item.id)">
            <div>
              <div class="day" >
                {{item.day}}
              </div>
              <div class="date">
                {{item.date}}
              </div>
            </div>

            <div>
              <div class="tit" >
                {{item.title}}
              </div>
              <div class="content">
                <!-- {{item.message}} -->
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>

  </div>
</template>
<script>
import {newsAPI} from '../../assets/http'
import {animate} from '@/assets/isViewPort'
export default {
  mounted(){
    window.addEventListener('scroll',this.handleScroll,true)
    this.handleScroll()
    newsAPI.getList().then(res=>{
      let data=res.dataList
      this.newsCenter.left.tit=res.dataList[0].title
      this.newsCenter.right=[]
      data.forEach((el,i) => {
        newsAPI.getDetail(el.id).then(res=>{
          let news=res.dataInfo
          if(i==0){
            this.newsCenter.left=news
          }else{
            let x=news
            let date=x.gmdCreate.split("-")
            x.date=date[0]+'-'+date[1]
            x.day=date[2]
            this.newsCenter.right.push(news)
          }
        })
      });

    })
  },
  beforeDestroy(){
    window.removeEventListener('scroll',this.handleScroll)
  },
  methods:{
    handleScroll(){
      animate(this.$refs.top)
      animate(this.$refs.mid)
      animate(this.$refs.bottom)
    },
    newsGo(id){
      console.log(id);
      this.$router.push({ name: 'news', params: { id: id}})
    }
  },
  props:['liIndex'],
  data(){
    return{
      newsCenter:{
        
        left:{
          picture:require('../../assets/home/cultivate/img.png'),
          title:'这是标题',
          message:'阿巴阿巴阿巴阿巴阿巴阿巴'
        },
        right:[
          {
            date:'2019-1',
            day:'12',
            title:'标题1',
            message:'阿巴阿巴阿巴阿巴'
          }
        ]
      }
    }
  }
}
</script>
<style lang="less" scoped>

  .top{
    
    margin-top: 1px;
    height: 600px;
    background-size: 100% 100%;
    background-image: url('../../assets/home/cultivate/bg2.jpg');

    .section{
      margin-left: 20%;
      height: 100%;
      background-size: 100% 100%;
      width: 30%;
      background-color: rgba(255, 255, 255,.8);
      box-sizing: border-box;
      padding: 20px 50px;
      > :nth-child(1){
        font-size: 25px;
        font-weight: 600;
        letter-spacing: 2px;
        color: #424242;
      }
      > :nth-child(2){
        font-weight: 600;
        font-size: 30px;      
        color: #a4a4a4;
      }
      > :nth-child(3){
        font-weight: 600;
        font-size: 15px;
        color: rgba(50,50,50,.35);
        margin-bottom: 20px;
      }
      .text{
        color: #565555;
      }
    }
  }
  @keyframes qiu {
    0% {
      opacity: 1;
      transform: translate(2px,-10px);
    }
    50% {
      opacity: .8;
    }
    100% {
      opacity: 1;
      transform: translate(0px,10px);
    }
  }
  @keyframes rqiu {
    0% {
      opacity: .8;
      transform: translate(2px,-20px);
    }
    50% {
      opacity: .6;
    }
    100% {
      opacity: .8;
      transform: translate(0px,20px);
    }
  }
  @keyframes logo {
    0% {
      transform: translate(-50%,-50%) scale(1);
    }

    100% {
      transform: translate(-50%,-50%) scale(1.1);
    }
  }

  .center{
    height: 600px;
    z-index: 99;
    background-image: url('../../assets/home/cultivate/bg.jpg');
    background-size: 100% 100%;
    width: 100%;
    box-shadow:1px 1px 8px #333333;
    overflow: hidden;
    .huawei{
      position: absolute;
      width: 50%;
      top: 50%;
      left: 50%;
      animation: none;
      animation:logo 5s linear infinite alternate;
    }
      position: relative;
      img{
        animation:qiu 3s infinite alternate;
        position: absolute;
      }
      .l{
        animation-delay:2s;
        display: block;
        left: -5px;
        top: 30%;
        width: 10%;
      }
      .lt{
        animation-delay:1s;
        display: block;
        left: 5%;
        top: 5%;
        width: 5%;       
      }
      .t{
        animation-delay:3s;
        display: block;
        left: 65%;
        top: -10px;
        width: 10%;       
      }
      .b{
        animation-delay:4s;
        display: block;
        left: 20%;
        bottom: -10px;
        width: 10%;       
      }
      .rb{
        display: block;
        right: 10%;
        bottom: -10px;
        width: 5%;       
      }
      .r{
        animation:rqiu 2s infinite alternate;

        display: block;
        right: 0%;
        top: 30%;
        width: 5%;       
      }
  }
  .bottom{
    display: flex;
    flex-direction: column;
    align-items: center;
    
    height: 600px;
    background-color: #d4d4d4;
    .tit{
      p{
        text-align: center;
        font-size: 30px;
        margin: 20px 0;
        font-weight: 600;
      color: #494949;
      }
      div{
        display: flex;
        align-items: center;
        justify-content: center;
        > :nth-child(2){
          margin: 0 10px;
          width:40%;
        }
        > :nth-child(1){
          width: 20%;
        }
        > :nth-child(3){
          width: 20%;
        }
        display: flex;
        align-items: center;
      }
    }
    .newsSection{
      height: 90% !important;
      justify-content: space-between;
      width: 80%;
      margin-top: 20px;
      display: flex;
      .left{
        .tit{
          margin: 8px 0;
        }
        img{
          width: 100%;
          height: 75%;
        }
        width: 50%;
        .content{
          overflow: hidden;
          height:80px;
        }
      }

      .right{
        width: 45%;
        > :nth-last-child(1){
          border:none;
        }
        >div{
          display: flex;
          border-bottom: 1px dashed #8d8c8c;
          padding: 10px 0 15px;
          > :nth-child(1){
            .day{
              color: #333;
              font-size: 56px;
            }
            .date{
              text-align: center;
              color: #999;
              transform: translate(5px,-7px);
              font-size: 15px;
            }
          }
          > :nth-child(2){
            margin-top: 5px;
            margin-left: 10px;
            .tit{
              font-size: 20px;
            }
            .content{
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              font-size: 14px;
              color: #333;
              max-width: 200px;
            }
          }
        }
      }
    }
  }
/* 响应式布局 */
/* 1. 超小屏幕下  <=767 */
@media screen and (max-width: 767px) {
  .bottom{
    height: 400px;
  }
  .newsSection{
    
    flex-direction: column;
      .left{
        .tit{
          margin: 8px 0;
        }
        img{
          width: 100% !important;
          height: 75%;
        }
        width: 100% !important;
      }    
      .right{
        display: none;
      }
  }
  .wrapper{
    .top{
      .section{
        margin: 0;
        width: 100% !important;
      }
    }
  }
  .center{
    display: none;
    .foot{
      
      >div{
        font-size: 16px;
      }
    }
  }
}
/* 2. 小屏幕下  768~992  */
@media screen and (max-width: 992px) {
  .bottom{
    height: 500px;
  }
  .wrapper{
    .center{
      .foot{
        >div{
          font-size: 16px;
        }
      }
    }
    .top{
      .section{
        width: 60%;
      }
    }
  }
}  

</style>