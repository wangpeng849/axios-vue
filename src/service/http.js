import axios  from 'axios'
import service from './contactApi'
import {Toast} from 'vant'

//service 循环遍历不同请求方法
let instance = axios.create({
    baseURL: 'http://localhost:9000/api',
    timeout: 1000
})

//包括请求方法的容器
const Http = {

}

for(let key in service){
    let api = service[key]; //url method
    // async 避免进入回调地狱
    Http[key] = async function(
        params, //请求参数 get:url,put,post,patch（data)
        isFormData=false,//标记是否为表单请求
        config={}, //配置参数
    ){
        let newParams = {}
        //content-type判断
        if(params && isFormData){
            newParams = new FormData()
            for(let i in params){
                newParams.append(i,params[i])
            }
        }else{
            newParams = params
        }
        // 不同的请求判断
        let response = null
        if(api.method === 'put' || api.method === 'post' || api.method === 'patch'){
            try{
               response =  await instance[api.method](api.url,newParams,config)
            }catch(err){
                response = err 
            }
        }else if(api.method === 'delete'|| api.method === 'get'){
            config.params = newParams
            try{
                response =  await instance[api.method](api.url,config)
              }catch(err){
                  response = err 
              } 
        }else{
            //get请求
            config.params = newParams
            try{
                response =  await instance[api.method](api.url,config)
              }catch(err){
                  response = err 
              } 
        }
        return response //返回响应值
    }
}


//拦截器的添加
instance.interceptors.request.use(config => {
    //发起请求
    Toast.loading({
        mask: false,
        duration: 0,//一直存在
        forbidClick: true,//禁止点击
        message: '加载中...',
    })
    return config
},() => {
    //请求错误
    Toast.clear()
    Toast('请求错误，请稍后再试')
})

//响应拦截器
instance.interceptors.response.use(res => {
    Toast.clear()
    return res.data
},() => {
    Toast.clear()
    Toast('请求错误，请稍后再试')
})

export default Http