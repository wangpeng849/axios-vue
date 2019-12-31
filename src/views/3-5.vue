<template>
    <div></div>
</template>

<script>
//取消请求  取消正在进行的http请求（了解）
import axios from 'axios'

export default {
  name: 'axios3-5',
  created ()  {
     let source = axios.CancelToken.source()
     axios.get('/data.json',{
         cancelToken:source.token
     }).then(res=>{
         console.log(res);
         
     }).catch(err => {
         console.log(err);
         
     })

     //取消请求 cancel(message) --> message 可选
     source.cancel('cancle http ')

     //大多数情况下用不到
  }
 
}
</script>
