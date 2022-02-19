import axios from 'axios'
// axios.defaults.baseURL='/dai/'
axios.defaults.baseURL='http://121.37.67.75:7009'

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
  getgroup:function(){
    return post('/group/list',{id:""})
  },
  getRoute:function(id){
    return post('/learn/module/list',{groupId:id})
  }
}
//新闻列表
let newsAPI={
  getDetail:function(id){
    return post('/news/getNewsById',{id:id})  
  },
  getList:function(){
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
  getProject:function(id){
    return post('/project/projectList',{})  
    window.location()
  }
}
let login={
  login:function(data){
    return post('/user/login',data)
  }
}
let msgBoard={
  getList:function(){
    return post('/bbs/bbsList',{})  
  },
  send:function(userId,mes){
    return post('/bbs/bbsSend',{
      "message": mes,
      "userId": userId
    })  
  },

}
// test(newsAPI.getDetail(2))
export{newsAPI,login,studyRouteAPI,project,msgBoard} 