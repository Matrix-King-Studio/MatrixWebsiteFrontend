<template>
  <div class="wrapper">

    <div class="back" >
      <div @click="back">>返回</div>
    </div>

    <div class="text" ref="text" id="text">
    </div>

  </div>
</template>
<script>
import {newsAPI} from '../assets/http'
export default {
  data(){
    return{
    }
  },
  mounted:function(){
    if(this.$route.params.id){
      window.localStorage.setItem('newsId',this.$route.params.id)
    }
    newsAPI.getDetail(localStorage.getItem('newsId') || this.$route.params.id).then(
      res=>{
        console.log(res.dataInfo);
        if(!res.dataInfo){
          this.$router.push('home')
          return
        }
        
        this.$refs.text.innerHTML=res.dataInfo.message
      }
    )
    
    
  },
  methods:{
    back(){
      this.$router.push('home')
    }
  }
}
</script>
<style lang="less" scoped>

  .wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .back{
    color: #929ba0;
    width: 90%;
    margin: 20px 0;
    text-indent: 1em;
  }
  .text{
    width: 90%;
    margin: 10px 0 50px;
  }
</style>