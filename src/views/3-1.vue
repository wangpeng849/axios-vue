<template>
    <div></div>
</template>

<script>
// 并发请求  同时行进多个请求 并同意处理返回值
import axios from 'axios'

export default {
    // axios 实例
    // 后端接口有多个，并且超时时长不一样
  name: 'axios3-1',
  created ()  { 
    let instance = axios.create({
        baseURL: 'http://localhost:8080',
        timeout: 1000,        
    })
    instance.get('/data.json').then(res => {
        console.log(res.data);
    })
  }
 
}
</script>
