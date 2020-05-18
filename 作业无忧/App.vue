<!--
 * @Author: your name
 * @Date: 2019-12-04 19:58:31
 * @LastEditTime: 2020-05-17 12:02:32
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \homeworkUnless\作业无忧\App.vue
--> 
<script>
import initData from "./common/initData.js"
export default {
	onLaunch: function() {
		initData.getBalance()//初始化余额
		initData.getUserInfo()//
	},
	methods:{
		
	},
	onShow: function() {
	},
	onHide: function() {
	}
};
</script>

<style>
/*每个页面公共css */ 
@import "colorui/main.css";
@import "colorui/icon.css";
@import './common/uni.css';
</style>
