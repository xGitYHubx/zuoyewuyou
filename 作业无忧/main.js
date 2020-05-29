/*
 * @Author: your name
 * @Date: 2019-12-04 19:58:31
 * @LastEditTime: 2020-05-18 23:16:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \homeworkUnless\作业无忧\main.js
 */ 
import Vue from 'vue'
import App from './App'
require('promise.prototype.finally').shim();//低版本浏览器对finally的支持

Vue.config.productionTip = false
Vue.prototype.$host = "http://58.87.100.5:80"


//全局函数 工具函数
import RWcommon from './common/utils.js'
Vue.prototype.RWcommon = RWcommon


import uni_request from './common/uni_request.js'

const request = uni_request({ // 有效配置项只有三个
	baseURL: "http://58.87.100.5:80", //baseURL
	timeout: 5000, // 超时时间
	// heaers: {
	//     // 'x-custom-header': 'x-custom-header'
	// }
});

request.interceptors.request.use(config => { // 请求拦截器（可以设置多个）
    config.headers.Authorization = uni.getStorageSync('token')||""
    return config
})
//添加拦截器

request.interceptors.response.use((response, next) => {
	
   if(response.data.success==true){
	   return response
   }else{
	   var content=""
	   if(response.data.message==0){//未登录     
		   // console.log('未登录');
		   content='这个操作需要登陆，点击确定前往登陆或注册'
		   // uni.show
	   }else if(response.data.message==1){
		   content='登陆已过期，点击确定前往登陆'
		   // console.log("token过期");
	   }else if(response.data.message==2){
		   // console.log("token校验失败");
		   content='登陆已过期，点击确定前往登陆'
	   }
	   
	   uni.showModal({
	   	title: '失败',
			content: content,
			showCancel:false,
	   	success: function(res) {
			// console.log(response);
	   		if (res.confirm) {
	   			uni.redirectTo({
	   				url: "/pages/login/login"
	   			})
	   		} else if (res.cancel) {
	   			uni.navigateBack({
	   				delta: 1
	   			})
	   		}
	   	}
	   });
	   
	   return response
	   
   }
});


Vue.prototype.RWajax = request









App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
