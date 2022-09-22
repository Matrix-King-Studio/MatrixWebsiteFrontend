import axios from 'axios'
axios.defaults.baseURL='/dai'
// axios.defaults.baseURL='http://121.37.67.75:7009'
// axios.defaults.baseURL='http://121.37.67.75:11111'

let get=axios.get
let post=axios.post
//脱壳处理
axios.interceptors.response.use(res=>{
  // 接口请求失败处理.....(待开发)
  return res.data.body
})
//测试函数
async function test(prom){
  console.log(await prom); 
}
// 学习路线
let studyRouteAPI={
  getgroup(){
    return post('/group/list',{id:""})
  },
  getRoute(id){
    return post('/learn/module/list',{groupId:id})
  }
}
//新闻列表
let newsAPI={
  getDetail(id){
    return post('/news/getNewsById',{id:id})  
  },
  getList(){
    let form={
      "id": 0,
      "pageNumber": 1,
      "pageSize": 10,
      "title": ""
    }
    return post('/news/newsList',form)
  }  
}

let project={
  getProject(id){
    return post('/project/projectList',{})  
    window.location()
  }
}

let msgBoard={
  getList(){
    return post('/bbs/bbsList',{})  
  },
  send(userId,mes){
    return post('/bbs/bbsSend',{
      "message": mes,
      "userId": userId
    })  
  },

}
//每日一题
let problems={
  getAll(){
    return post('/problem/getAll',{})
  },
  getRank(){
    return post('/blog/ranking',{})
  },
  getBlog(data){
    return post('/blog/submit',data)
  },
  setSub(data){
    return post('/user/subscribe',data)
  },
  //根据提供条件查找题目 
  getByConditions(data){
    return post('/problem/getByConditions',data)
  },
  getSubscribe(id){
    return post('/user/checkSubscribe',{id})
  }
}
// test(newsAPI.getDetail(2))
export{newsAPI,studyRouteAPI,project,msgBoard,problems} 