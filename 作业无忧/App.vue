<script>
import initData from "./common/initData.js"
export default {
	onLaunch: function() {
		initData.getBalance()//初始化余额
		initData.getUserInfo()
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
