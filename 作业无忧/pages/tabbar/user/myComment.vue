<template>
	<view>
		<view class="cu-card dynamic">
			<view class="cu-item shadow" v-for="(item,index) in list" :key="index" @click="toDetail(item.taskId)">
				<view class="cu-list menu-avatar comment solids-top">
					<view class="cu-item">
						<view class="cu-avatar round" :style="'background-image:url('+item.avatarUrl+')'"></view>
						<view class="content">
							<view class="text-grey">{{item.name}}</view>
							<view class="text-gray text-content text-df">
								{{item.commentText}}
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">{{item.createTime}}</view>
								<view>

									<!-- <text class="cuIcon-messagefill text-green margin-left-sm">已采用</text> -->
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="rw-page-loading" v-if='isLoading'>
				{{loadingMsg}}
			</view>
		</view>
	</view>
</template>

<script>
	import initData from '../../../common/initData.js'
	export default {
		data() {
			return {
				isCard: true,
				list: [],
				isLoading: false,
				loadingMsg: "加载中..."
			};
		},
		onLoad() {
			initData.checkLogin()
			this.getComment()
		},
		methods: {
			IsCard(e) {
				this.isCard = e.detail.value
			},
			toDetail(taskId) {
				uni.navigateTo({
					url: `../../square-detail/RWDetailById?taskId=${taskId}`
				});
			},

			getComment() {
				var _this = this
				_this.isLoading=true
				this.RWajax.get('/mine/query', {
					account: uni.getStorageSync('account'),
					type: 1
				}).then(res => {
					_this.isLoading=false
					if (res.data.success == true) {
						_this.list = res.data.result
						if(_this.list.length==0){
							_this.isLoading=true
							_this.loadingMsg="您还没有评论过"
						}
					}
				})
			}
		}
	}
</script>

<style>

</style>
