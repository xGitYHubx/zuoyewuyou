<template>
	<view>
		<view v-for="(item,index) in records" class="RC_oneRecord">
			<view class="RC_time">{{item.operateTime}}</view>
			<view v-if="item.type==1" class="RC_detials">
				<view class="RC_title">
					<view>
						作业无忧收款凭证
					</view>
				</view>
				<view class="RC_amount">
					<view class="RC_amount_title">
						收款金额
					</view>
					<view class="RC_amount_num">
						￥{{item.amount}}
					</view>
				</view>
				<view class="RC_operator">
					<view class="RC_left_little">
						付款人：
					</view>
					<view class="RC_operator_name">
						{{item.operator}}
					</view>
				</view>
				<view class="RC_reason">
					<view class="RC_left_little">
						交易详情：
					</view>
					<view class="RC_reason_detail">
						{{item.reason}}
					</view>
				</view>

			</view>
			<view v-if="item.type==0" class="RC_detials">
				<view class="RC_title">
					<view>
						作业无忧支付凭证
					</view>
				</view>
				<view class="RC_amount">
					<view class="RC_amount_title">
						付款金额
					</view>
					<view class="RC_amount_num">
						￥{{item.amount}}
					</view>
				</view>
				<view class="RC_operator">
					<view class="RC_left_little">
						付款人：
					</view>
					<view class="RC_operator_name">
						{{item.operator}}
					</view>
				</view>
				<view class="RC_reason">
					<view class="RC_left_little">
						交易详情：
					</view>
					<view class="RC_reason_detail">
						{{item.reason}}
					</view>
				</view>

			</view>

		</view>
	<view class="rw-page-loading" v-if='isLoading'>
		{{loadingMsg}}
	</view>
	</view>

</template>

<script>
	import initData from '../../../common/initData.js'
	export default {
		data() {
			return {
				page:0,
				isCard: true,
				records: [
					// {
					// 	account: 'bilibili',
					// 	amount: '100',
					// 	type: '0',
					// 	reason: '辅导课程',
					// 	operator: '12345678910',
					// 	operateTime: '2020/6/22'
					// },
					// {
					// 	account: 'bilibili',
					// 	amount: '100',
					// 	type: '0',
					// 	reason: '辅导课程',
					// 	operator: '12345678910',
					// 	operateTime: '2020/6/22'
					// },
					// {
					// 	account: 'bilibili',
					// 	amount: '100',
					// 	type: '1',
					// 	reason: '辅导课程',
					// 	operator: '12345678910',
					// 	operateTime: '2020/6/22'
					// }
				],
				isLoading: false,
				loadingMsg: "加载中..."
			};
		},
		onLoad() {
			initData.checkLogin()
			this.getRecord(0)
		},
		onReachBottom() {
		
			this.isLoading = true
			this.getRecord(this.page);
		},
		methods: {
			getRecord(page){
				this.RWajax.get('/backstage/query/coinDetail/single', {
					page: page,
					account:uni.getStorageSync('account'),
				}).then(res => {
					console.log(res.data)
					if (res.data.success) {
						if (res.data.result.length > 0) {
							this.records = this.records.concat(res.data.result);
							this.page++;
						} 
					}
					this.isLoading = false;
				})
			}
		}
	}
</script>

<style>
	.RC_time {
		text-align: center;
		margin-top: 4vh;
		margin-bottom: 2vh;
		color:#aaaaaa;
	}

	.RC_detials {
		padding: 5vw;
		background-color: white;
		width: 94vw;
		margin-left: 3vw;
		border-radius: 4px;
		vertical-align: top;
	}
	.RC_title{
		font-size: 1.4em;
		
	}
	.RC_amount{
		text-align: center;
		margin-top: 4vw;
		margin-bottom: 4vw;
	}
	.RC_amount_title{
		color: #aaaaaa;
		/* font-size: 1.1em; */
		/* margin-bottom: 1vw; */
	}
	.RC_amount_num{
		font-size: 3em;
	}
	.RC_operator{
		margin-bottom: 1vw;
	}
	.RC_left_little{
		color: #8799a3;
		display: inline-block;
		width: 30%;
	}
	.RC_operator_name{
		width: 70%;
		display: inline-block;
	}
	.RC_reason{
		margin-bottom: 1vw;
	}
	.RC_reason_detail{
		width: 70%;
		display: inline-block;
	}
</style>
