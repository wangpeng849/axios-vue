<template>
    <div></div>
</template>

<script>
// 并发请求  同时行进多个请求 并同意处理返回值
import axios from 'axios'

export default {
    //拦截器 ： 在请求或响应处理前拦截
      //请求拦截器
      //响应拦截器
  name: 'axios3-3',
  created ()  { 
       //请求拦截器
       axios.interceptors.request.use(config => {
           //在发送请求前 做些什么
           return config
       },err => {
           //在请求后 做些什么
           return Promise.reject(err)
       })
        //响应拦截器
        axios.interceptors.response.use(res => {
            //请求成功对响应数据 做处理
            return res
        },err => {
            //响应错误 做些什么
            return Promise.reject(err)
        })
        axios.get().then(res => {
            console.log(res);
            
        })
  }
 
}
</script>
