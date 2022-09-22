import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/Home.vue'
import {homeChild} from './homeChild'
import project from '../views/project.vue'
import studyRoute from '../views/studyRoute.vue'
import news from '../views/news.vue'
import recruit from '../views/recruit.vue'
import msgboard from '../views/msgboard.vue'
import problems from '../views/problems.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: "*",
    redirect: "/home"
  },
  {
    path: "/",
    redirect: "/home"
  },

  {
    path: "/studyRoute",
    component:studyRoute,
    name:'studyRoute'
  },
  {
    path: "/msgboard",
    component:msgboard,
    name:'msgboard'
  },
  {
    path: "/project",
    component:project,
    name:'project'
  },
  {
    path: "/recruit",
    component:recruit,
    name:'recruit'
  },
  {
    path: "/problems",
    component:problems,
    name:'problems'
  },
  {
    path:'/news:id',
    component:news,
    name:'news'
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    children:[
      ...homeChild
    ]
  },
]
const router = new VueRouter({
  routes,

})
// 滚动动画
router.beforeEach((to, from, next) => {
  let scroll=setInterval(()=>{
    let scrollTop=document.documentElement.scrollTop
    let speed = Math.floor(scrollTop / 12)<200?200:Math.floor(scrollTop / 12);
    if(scrollTop<=0){
      clearInterval(scroll)
    }
    document.documentElement.scrollTop-=speed

  },30)
  
  next()
})
export default router
