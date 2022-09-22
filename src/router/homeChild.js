import news from '../views/news.vue'

export const homeChild =[
  { 
    path:'/home',
    component:()=> import('../views/home/cultivate')
  },
  { 
    path:'/home/activity',
    component:()=> import('../views/home/activity.vue')
  },
  { 
    path:'/home/practice',
    component:()=> import('../views/home/practice')
  },
  { 
    path:'/home/jobGuide',
    component:()=> import('../views/home/jobGuide.vue')
  },

]