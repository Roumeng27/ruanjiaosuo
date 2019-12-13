// let baseUrl = 'http://192.168.66.247:2000' //测试
// let baseUrl = 'http://10.128.4.215:2000' //测试
let baseUrl = 'http://fujian.zhaobiaocaigou.com.cn:5001'
import axios from 'axios'
import router from '../router'

axios.interceptors.request.use(config => {
    config.headers["X-Auth-Token"] = window.localStorage.getItem('login');
    return config;
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
	if(response.data.status == 1001){
		router.push({
		 	name:'login'
        })
        this.$message.warning(response.data.msg);
        window.localStorage.removeItem('login');
	}
    return response
}, err => {
//  Notification.error({
//      title: '错误提示',
//      message: '网络错误请稍后重试',
//      duration: 2000
//  })

    return Promise.reject(err)
})


export default baseUrl;