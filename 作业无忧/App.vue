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
	const badge_module = uni.requireNativePlugin('Laowu-BadgeModule');
	import UniSocketPromise from "@i5920/uni-socket-promise"


	export default {
		onLaunch: function() {
			initData.getBalance() //初始化余额
			initData.getUserInfo() //
			this.freshUserInfo()
			badge_module.getManufacturer(function(res) {
				console.log(res);
			})
			// badge_module.setBadge(2)
			badge_module.setPush({
				title: '测试推送',
				content: '测试推送内容'
			});
		},
		methods: {
			freshUserInfo() {
				initData.getUserInfo().then(res => {
					//token校验有效，获取到了用户信息
					//初始化websocket
					// console.log(res);
					this.globalData.socket = new UniSocketPromise({
						url: "ws://58.87.100.5:8088/ws",
						data: {
							account: res.account,
							token: uni.getStorageSync("token")
						},
						heartTime: 1 * 8 * 1000, // 心跳时间间隔
						isHeartData: true, // 是否发送心跳
						isReconnect: true, // 是否断线重连
						reConnectTime: 3000, // 断线重连检测时间间隔
						debug: true, // debug
						onSocketOpen: header => {},
						onSocketError: res => {},
						onSocketClose: res => {},
						onSocketMessageAfter: (data, pool) => {
							console.log(data);
							uni.showToast({
								title: data.senderName+'给你评论了'
							})
							badge_module.setPush({
								title: '作业无忧 有新评论了',
								content: data.senderName+'给你评论了'
							});
							if (data) {
								pool.resolve(data);
							} else {
								pool.reject(data);
							}
						}
					});
					this.globalData.socket.initSocket();

					
				})

			}
		},
		onShow: function() {},
		onHide: function() {}
	};
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import './common/uni.css';
</style>
