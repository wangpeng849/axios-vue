<template>
  <div class="home">
    
  </div>
</template>

<script>
// @ is an alias to /src
/**
 * axios 请求方法 get post put patch delete
 *         
 *      get : 获取数据
 *      post: 提交数据
 *      put： 编辑数据/更新数据  将所有数据推送给后端
 *      patch: 编辑数据/更新数据  将修改的数据推送到后端
 *      delete: 删除数据
 */

import axios from 'axios'

export default {
  name: 'axios2-2',
  components: {
    
  },
  created() {
      /**
       * get 的两种写法
       */
      // http://localhost:8080/data.json?id=12
    axios.get('/data.json',{
        params:{
            id: 12
        }
    }).then((res)=>{
      console.log(res.data);
    }),
    axios({
        method: 'get',
        url: '/data.json',
        params:{
            id:12
        }
    }).then((res)=>{
      console.log(res.data);
    })
    /**
     * post
     * 1. form-data 表单提交（图片上传，文件上传）
     * 2. application/json 
     */
    let data = {
        id: 12
    }
    // application/json
    axios.post('/post',data).then(res =>{
        console.log(res.data);
    })
    axios({
        method: 'post',
        url: '/post',
        data: data
    }).then((res)=>{
      console.log(res.data);
    })
    // form-data
    let formData = new FormData()
    for(let key in data){
        formData.append(key,data[key])
    }
    axios.post('/post',formData).then(res =>{
        console.log(res.data);
    })

    /**
        delete 请求
     */
     axios.delete('/delete',{
       params:{
         id: 12
       }
     }).then(res => {
       console.log(res.data);
       
     })
  }
}
</script>
