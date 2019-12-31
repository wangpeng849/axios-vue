import axios  from 'axios'
import service from './contactApi'

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
        config={} //配置参数
    ){
        let url = api.url
        let newParams = {}
        //content-type判断
        if(params && isFormData){
            newParams = new FormData()
            for(let i in params){
                newParams.append(key,params[key])
            }
        }else{
            newParams = params
        }
        // 不同的请求判断
        if(api.method === 'put' || api.method === 'post' || api.method === 'patch'){
            try{
              response =  await instance[api.method](api.url,newParams,config)
            }catch(err){
                response = err
            }
        }
    }
}