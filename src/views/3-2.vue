<template>
    <div></div>
</template>

<script>
// 并发请求  同时行进多个请求 并同意处理返回值
import axios from 'axios'

export default {
    // axios 配置参数
  name: 'axios3-2',
  created ()  { 
   axios.create({
       baseURL: "localhost:8080",//请求域名
        timout: 1000,//超时时长
        url: '/data.json',//请求路径
        method: 'get',//请求方法 get post put patch delete 
        headers: {
            token: ''//验证信息
        },
        params: {
            
        }, //请求参数拼接在url中
        data: {

        } //请求参数方在请求体
   })
   axios.get('/data.json')  // 默认baseURL
   // 1. axios全局配置
   axios.defaults.timeout = 1000 //全局配置一个超时时间
   axios.defaults.baseURL = 'http://localhost:8080' //全局配置一个url

   // 2. axios实例配置
    let instance = axios.create()
    instance.defaults.timeout = 3000 //实例设置超时时间

   // 3. axios请求配置
    instance.get('/data.json',{
        timeout : 5000 // 设置为 5000
    })


    //实际开发
    //有两种请求
    // localhost:9090
    // localhost:9091
    let instance = axios.create({
        baseURL: 'localhost:9090',
        timeout: 1000
    })
    let instance1 = axios.create({
        baseURL: 'localhost:9091',
        timeout: 3000
    })
    // baseURL  timeout url method params
    instance.get("/contractList",{
        params:{}
    }).then(res=>{
        console.log(res);
    })
    // baseURL timeout url method 
    instance1.get('/orderList',{
        timeout: 5000
    }).then(res =>{
        console.log(res);
    })
}
}
</script>
