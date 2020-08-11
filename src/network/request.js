import axios from 'axios'


export function request(config) {
//这个函数本身返回的就是一个Promise
    const instance = axios.create({
      baseURL:'http://123.207.32.32:8000',
      timeout:5000
    })

  //2.axios拦截器
  //请求拦截
instance.interceptors.request.use(config =>{
  //请求拦截的作用
  //   1.config中的一些配置信息不符合服务器的要求
  //   2.比如每次在发送网络请求时,都希望现实一个请求的图标
  //   3.某些网络请求(比如登录(token)),必须携带一些特殊信息
  //console.log(config)
  return config
},err => {
  console.log(err)
})

  //响应拦截
instance.interceptors.response.use(res =>{
  //console.log(res)
  return res.data
},err=> {
  console.log(err)
})


    //返回请求数据
    return instance(config)

}
