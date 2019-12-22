<template>
	<view>

		<radio-group class="block" @change="RadioChange">
			<view class="cu-form-group margin-top">
				<view class="title">
					<uni-text class="lg text-green cuIcon-weixin" style="font-size: 40upx"></uni-text> 微信支付
				</view>
				<radio class='radio black' :class="radio=='0'?'checked':''" :checked="radio=='0'?true:false" value="0"></radio>
			</view>
			<view class="cu-form-group">
				<view class="title">
					<uni-text class="lg text-blue cuIcon-sponsor" style="font-size: 40upx"></uni-text> 支付宝
				</view>
				<radio class='radio black' :class="radio=='1'?'checked':''" :checked="radio=='1'?true:false" value="1"></radio>
			</view>
			<view class="cu-form-group">
				<view class="title">测试</view>
				<radio class='radio black' :class="radio=='2'?'checked':''" :checked="radio=='2'?true:false" value="2"></radio>
			</view>
		</radio-group>


		<radio-group class="block" @change="priceChange">
			<view class="cu-form-group margin-top">
				<view class="title">10学币</view>
				<radio :class="price=='10'?'checked':''" :checked="price=='10'?true:false" value="10"></radio>
			</view>
			<view class="cu-form-group">
				<view class="title">30学币</view>
				<radio :class="price=='30'?'checked':''" :checked="price=='30'?true:false" value="30"></radio>
			</view>
			<view class="cu-form-group">
				<view class="title">50学币</view>
				<radio :class="price=='50'?'checked':''" :checked="price=='50'?true:false" value="50"></radio>
			</view>
			<view class="cu-form-group">
				<view class="title">100学币</view>
				<radio :class="price=='100'?'checked':''" :checked="price=='100'?true:false" value="100"></radio>
			</view>
			<!-- <view class="cu-form-group">
				<view class="title">定义样式</view>
				<radio class='radio' :class="radio=='B'?'checked':''" :checked="radio=='B'?true:false" value="B"></radio>
			</view>
			<view class="cu-form-group">
				<view class="title">定义颜色</view>
				<view>
					<radio class='blue radio' :class="radio=='C'?'checked':''" :checked="radio=='C'?true:false" value="C"></radio>
					<radio class='red margin-left-sm' :class="radio=='D'?'checked':''" :checked="radio=='D'?true:false" value="D"></radio>
				</view>
			</view> -->
		</radio-group>


		<view class="uni-padding-wrap ">
			<view style="background:#FFF; padding:50upx 0;">
				<view class="uni-hello-text uni-center"></view>
				<view class="uni-h1 uni-center uni-common-mt">
					<text class="rmbLogo cuIcon-coin"></text>
					<input class="price" type="digit" :value="price" maxlength="4" @input="priceChange" />
				</view>
			</view>
			<view class="uni-btn-v ">
				<!-- #ifdef MP-WEIXIN || MP-QQ -->
				<!-- <button type="primary" @click="weixinPay" :loading="loading">微信支付</button> -->
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<!--      <template v-if="providerList.length > 0">
                    <button v-for="(item,index) in providerList" :key="index" @click="requestPaymentTest(item,index)"
                        :loading="item.loading">{{item.name}}支付</button>
                </template> -->
				<!-- #endif -->

				<button class="submit" @click="requestPaymentTest()" :loading="loading">立刻支付
				</button>
			</view>
		</view>
	</view>
</template>
<script>
	import initData from '../../../common/initData.js'
	export default {
		data() {
			return {
				title: 'request-payment',
				loading: false,
				price: 30,
				providerList: [],
				radio: 2,
				modalName: null,
				checkbox: [{
					value: 0,
					name: '微信',
					checked: false,
					hot: false,
				}, {
					value: 1,
					name: '支付宝',
					checked: false,
					hot: false,
				}, {
					value: 2,
					name: '英语',
					checked: false,
					hot: false,
				}, {
					value: 3,
					name: '物理',
					checked: false,
					hot: false,
				}]
			}
		},
		onLoad: function() {
			// #ifdef APP-PLUS
			uni.getProvider({
				service: "payment",
				success: (e) => {
					let providerList = [];
					e.provider.map((value) => {
						switch (value) {
							case 'alipay':
								providerList.push({
									name: '支付宝',
									id: value,
									loading: false
								});
								break;
							case 'wxpay':
								providerList.push({
									name: '微信',
									id: value,
									loading: false
								});
								break;
							default:
								break;
						}
					})
					this.providerList = providerList;
				},
				fail: (e) => {
					console.log("获取支付通道失败：", e);
				}
			});
			// #endif
		},
		methods: {
			weixinPay() {
				console.log("发起微信支付");
				this.loading = true;
				uni.login({
					success: (e) => {
						// console.log("login success", e);
						uni.request({
							url: `https://unidemo.dcloud.net.cn/payment/wx/mp?code=${e.code}&amount=${this.price}`,
							success: (res) => {
								console.log("pay request success", res);
								if (res.statusCode !== 200) {
									uni.showModal({
										content: "支付失败，请重试！",
										showCancel: false
									});
									return;
								}
								if (res.data.ret === 0) {
									console.log("得到接口prepay_id", res.data.payment);
									let paymentData = res.data.payment;
									uni.requestPayment({
										timeStamp: paymentData.timeStamp,
										nonceStr: paymentData.nonceStr,
										package: paymentData.package,
										signType: 'MD5',
										paySign: paymentData.paySign,
										success: (res) => {
											uni.showToast({
												title: "感谢您的赞助!"
											})
										},
										fail: (res) => {
											uni.showModal({
												content: "支付失败,原因为: " + res
													.errMsg,
												showCancel: false
											})
										},
										complete: () => {
											this.loading = false;
										}
									})
								} else {
									uni.showModal({
										content: res.data.desc,
										showCancel: false
									})
								}
							},
							fail: (e) => {
								console.log("fail", e);
								this.loading = false;
								uni.showModal({
									content: "支付失败,原因为: " + e.errMsg,
									showCancel: false
								})
							}
						})
					},
					fail: (e) => {
						console.log("fail", e);
						this.loading = false;
						uni.showModal({
							content: "支付失败,原因为: " + e.errMsg,
							showCancel: false
						})
					}
				})
			},
			requestPaymentTest(e) {

				this.RWajax.post("/user/recharge", {
					account: uni.getStorageSync('account'),
					coin: this.price
				}).then(res => {
					if (res.data.success == true) {
						uni.showToast({
							title: "充值成功",
							icon: 'success'
						})
						initData.getBalance()
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					}
					// console.log(res);
				}).catch(eroo => {
					console.log(eroo);
				})

				// uni.request({
				// 	url:this.$host+"/user/recharge",
				// 	header:{
				// 		"Authorization":uni.getStorageSync('token')
				// 	},
				// 	method:"post",
				// 	data:{
				// 		account:uni.getStorageSync('account'),
				// 		coin:this.price
				// 	},
				// 	success(res){
				// 		if(res.data.success==true){
				// 			uni.showToast({
				// 				title:"充值成功",
				// 				icon:'success'
				// 			})
				// 			initData.getBalance()
				// 			setTimeout(()=>{
				// 				uni.navigateBack({
				// 					delta:1
				// 				})
				// 			},1000)
				// 		}
				// 		console.log(res);
				// 	},						
				// 	fail(res) {
				// 		console.log(res);
				// 	}

				// })
			},
			async requestPayment(e, index) {
				this.providerList[index].loading = true;
				let orderInfo = await this.getOrderInfo(e.id);
				console.log(orderInfo.data)
				console.log("得到订单信息", orderInfo);
				if (orderInfo.statusCode !== 200) {
					console.log("获得订单信息失败", orderInfo);
					uni.showModal({
						content: "获得订单信息失败",
						showCancel: false
					})
					return;
				}
				uni.requestPayment({
					provider: e.id,
					orderInfo: orderInfo.data,
					success: (e) => {
						console.log("success", e);
						uni.showToast({
							title: "感谢您的赞助!"
						})
					},
					fail: (e) => {
						console.log("fail", e);
						uni.showModal({
							content: "支付失败,原因为: " + e.errMsg,
							showCancel: false
						})
					},
					complete: () => {
						this.providerList[index].loading = false;
					}
				})
			},
			getOrderInfo(e) {
				let appid = "";
				// #ifdef APP-PLUS
				appid = plus.runtime.appid;
				// #endif
				let url = 'https://demo.dcloud.net.cn/payment/?payid=' + e + '&appid=' + appid + '&total=' + this.price;
				return new Promise((res) => {
					uni.request({
						url: url,
						success: (result) => {
							res(result);
						},
						fail: (e) => {
							res(e);
						}
					})
				})
			},
			priceChange(e) {
				this.price = e.detail.value;
			},
			hideModal(e) {
				this.modalName = null
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
		}
	}
</script>

<style lang="scss" scoped>
	.rmbLogo {
		font-size: 50upx;
	}

	button {
		background-color: #007aff;
		color: #ffffff;
	}

	.uni-h1.uni-center {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: flex-end;
	}

	.submit {
		margin-top: 30px;
		margin-left: 20px;
		margin-right: 20px;
		color: white;
		background-color: #4191ea;
		-webkit-tap-highlight-color: #4191ea;

		&:active {
			color: #B6B6B6;
			background-color: rgba(63, 145, 234, 0.8);
		}
	}

	.price {
		border-bottom: 1px solid #eee;
		width: 180upx;
		height: 50upx;
		font-size: 20px;
		padding-bottom: 4upx;
		/* text-align: center; */
		text-indent: 60upx;
	}

	.ipaPayBtn {
		margin-top: 30upx;
	}

	.uni-common-mt {
		display: flex;
	}
</style>
