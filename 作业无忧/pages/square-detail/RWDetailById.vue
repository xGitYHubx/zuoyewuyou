<template>
	<view style="margin-bottom: 80upx;" id="main">
		<view class="cu-card dynamic" :class="isCard?'no-card':''">
			<view class="cu-item shadow" id='f0'>

				<!-- 问题 -->
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" :style="'background-image:url('+avatarDefault(task.avatarUrl)+');'"></view>
						<view class="content flex-sub">
							<view>{{task.name||task.account}}</view>
							<view class="text-gray text-sm flex justify-between">
								{{task.createTime}}
							</view>
						</view>
					</view>
				</view>
				<view class="text-content">
					{{task.descText}}
				</view>

				<view class="image">
					<image class="task-img" v-for="(item,index) in taskImg" :key="index" :src="item" mode="widthFix" @tap="ViewImage"
					 :data-url="item"></image>
				</view>
				<view class="text-orange cuIcon-coin text-right padding RW-border-bottom">
					{{task.reward}}
				</view>



				<!-- 评论列表 -->
				<view :class="'cu-list menu-avatar comment '" v-for='(item,index) in msg' :id="item.id" :key='index'>
					<view class="cu-item">
						<view class="cu-avatar round" :style="'background-image:url('+avatarDefault(item.avatarUrl)+');'"></view>
						<view class="content">
							<view class="text-grey">{{item.name||item.account}}</view>
							<view class="RW_floor">
								{{item.floor}}楼
							</view>
							<view class="RW_reply" @click="toEditComment(item.floor)">
								回复
							</view>
							<view style="color:#826767" class="RW_commentText">
								{{item.commentText}}
								<view class="grid flex-sub" :class="isCard?'col-3 grid-square':'col-1'">
									<view class="bg-img" :class="isCard?'':'only-img'" v-for="(photo,index) in item.pictureBeans" :key="index"
									 :style="'background-image:url('+ avatarDefault(photo.url) +');'" @tap="ViewCommentImg( JSON.stringify(item.pictureBeans) ,index)">
									</view>
								</view>
							</view>
							<view class="margin-top-sm text-gray text-sm flex justify-between">
								<view class="text-gray text-df">{{item.createTime}}</view>
								<view class='rw-caiyong'>
									<text class="cuIcon-appreciatefill text-red" v-if="isPublishMan&& !task.hasBest" @click="pickBestComment(item.commentId)">采用</text>
									<text class="cuIcon-check text-green" v-if="item.isBest==1">已采用</text>
									<view class="RW_quote" v-if="item.quote" @click="position(item._id)">
										引用{{item.quote}}楼
									</view>
								</view>
							</view>


						</view>
					</view>
				</view>

			</view>
		</view>



		<!-- 评论输入栏 -->
		<view class="cu-bar input rw-bottom-bar" v-if="role==1">
			<!-- <view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view> -->
			<input :adjust-position="false" class="solid-bottom" @tap="toEditComment(0)" maxlength="300" disabled cursor-spacing="10">

			<!-- <view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view> -->
			<button class="cu-btn bg-green shadow-blur" @click="toEditComment(0)">输入评论</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isCard: true,
				isMine: false,
				msg: [],
				taskImg: [],
				task: {},
				taskId: "",
				commentText: "",
				role: uni.getStorageSync("userInfo").role
			};
		},
		onLoad(options) {
			this.taskId = options.taskId
			this.getTask()
		},
		onShow() {
			this.isMine = uni.getStorageSync('account') == this.task.account ? true : false
			// this.taskImg=[]
			// this.getTaskImg()
		},
		computed: {
			isPublishMan() {
				if (uni.getStorageSync('account') == this.task.account) {
					return true
				} else {
					false
				}
			}
		},
		methods: {
			makeId(floor) {
				return 'f' + floor
			},
			position(quote) {
				uni.createSelectorQuery().select(quote).boundingClientRect(data => { //目标节点
					uni.createSelectorQuery().select("#main").boundingClientRect((res) => { //最外层盒子节点
						console.log(res.top)
						console.log(data.top)
						// console.log( (0-data.top)>0?0-data.top:0)
						uni.pageScrollTo({
							duration: 0, //过渡时间必须为0，uniapp bug，否则运行到手机会报错
							scrollTop: data.top - res.top, //滚动到实际距离是元素距离顶部的距离减去最外层盒子的滚动距离
						})
					}).exec()
				}).exec();
			},
			changeCommentText(e) {
				this.commentText = e.detail.value
			},
			IsCard(e) {
				this.isCard = e.detail.value
			},
			toEditComment(myquote) {
				uni.redirectTo({
					url: `./RWcomment?task=${encodeURIComponent(JSON.stringify(this.task))}&quote=` + myquote
				})
			},
			//获取任务里的图片
			getTaskImg() {
				var _this = this
				this.RWajax.get("/picture/query", {
					linkId: _this.task.taskId
				}).then(res => {
					if (res.data.success == true) {
						for (var i = 0; i < res.data.result.result.length; i++) {
							_this.taskImg.push(res.data.result.result[i].url)
						}
					}
				})
			},
			//预览图片
			ViewImage: function(e) {
				uni.previewImage({
					urls: this.taskImg,
					current: e.currentTarget.dataset.url
				});
			},
			ViewCommentImg(photos, index) {

				photos = JSON.parse(photos)
				var urlArr = []
				for (var i = 0; i < photos.length; i++) {
					urlArr.push(photos[i].url)
				}
				uni.previewImage({
					urls: urlArr,
					current: urlArr[index]
				});
			},
			pickBestComment(id) { //选取最佳评论
				var _this = this

				this.RWajax.post("/comment/pick", {
					commentId: id,
					publisherAccount: uni.getStorageSync('account')
				}).then(res => {
					if (res.data.success == true) {
						uni.showToast({
							title: "采用成功",
							icon: "success"
						})
						_this.msg = []
						_this.task.hasBest = true
						_this.getMsg()
					} else {
						uni.showToast({
							title: "采用失败:" + res.data.message,
							icon: 'none'
						})
					}
				})

			},
			//获取任务详情
			getTask() {
				var _this = this
				this.RWajax.get("/task/query/single", {
					taskId: _this.taskId
				}).then(res => {
					if (res.data.success == true) {
						_this.task = res.data.result
						_this.getTaskImg()
						_this.getMsg()
					}
				})
			},
			//发表评论
			sendCommen() {
				var _this = this
				uni.showLoading({
					title: '评论中...',
					mask: true
				});
				this.RWajax.post("/comment/publish", {
					account: uni.getStorageSync('account'),
					taskId: _this.task.taskId,
					commentText: _this.commentText
				}).then(res => {
					if (res.data.success == true) {
						uni.showToast({
							title: '发送成功'
						})
					} else {
						uni.showToast({
							title: '发送失败'
						})
					}
					_this.getMsg()
				}).finally(res => {
					uni.hideLoading()
				})

			},
			avatarDefault(url) {
				return this.RWcommon.avatarDefault(url)
				// if(url){
				// 	return url
				// }else{
				// 	return "../../static/user/avatar.png"
				// }
			},
			//获取评论
			getMsg() {
				var _this = this

				this.RWajax.get("/task/query/comments", {
					taskId: this.taskId,
					account: uni.getStorageSync('account')
				}).then(res => {
					if (res.data.success == true) {
						_this.msg = res.data.result
						_this.msg.forEach(element => {
							element.id = 'f' + element.floor
							element._id = '#f' + element.quote
						})
					}
				})
			}
		},
		watch: {
			task(newMsg, old) {},
			msg(newMsg, old) {},
		}
	}
</script>

<style>
	.rw-bottom-bar {
		position: fixed;
		bottom: 0px;
		width: 100%;
	}

	.task-img {
		width: 650upx;
		margin: 10upx 50upx;
	}

	.cu-list+.cu-list {
		margin-top: 0;
	}
</style>

<style scoped>
	.RW-border-bottom {
		border-bottom: #dddddd solid 16upx;
	}

	.comment {
		/* border-radius: 10px; */
		/* border-bottom: #dddddd solid 8upx; */

	}

	.rw-caiyong text {
		margin: 0 10upx;
	}

	.RW_floor {

		font-size: 0.9em;
	}

	.RW_reply {
		position: absolute;
		right: 5vw;
		top: 2vh;
		color: #0081FF
	}

	.RW_quote {
		/* position: absolute; */
		float: right;
		margin-right: 5vw;
		/* bottom: 0vh; */
		color: #aaaaaa;
	}

	.RW_commentText {
		font-size: 1.2em;
		margin-top: 1vh;
	}
</style>
