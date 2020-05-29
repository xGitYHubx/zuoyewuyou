<template>
	<view class="content">
		<view class="uni-list list-pd">
			<view class="cu-form-group margin-top">
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="任务描述"></textarea>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">学科</view>
				<picker @change="PickerChangeSubject" :value="index_subject" :range="picker_subject">
					<view class="picker">
						{{picker_subject[index_subject]}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">年级</view>
				<picker @change="PickerChangeGrade" :value="index_grade" :range="picker_grade">
					<view class="picker">
						{{picker_grade[index_grade]}}
					</view>
				</picker>
			</view>
			<!-- <view class="uni-list-cell cell-pd">
				<view class="uni-textarea">
					<textarea
						:focus=true
						placeholder="输入发布内容..."
						:maxlength=200
						:value="textContent"
						@input="handleTextInput"/>
				</view>
			</view> -->
			<view class="cu-form-group margin-top">
				<view class="title">悬赏</view>
				<input type="number" placeholder="悬赏的金币额" name="input" @input="changePrice">
				<text class='cuIcon-coin text-orange'></text>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					图片上传
				</view>
				<view class="action">
					{{imgList.length}}/9
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
						<image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<9">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<button class="submit" type="primary" :disabled="publishing" @tap="publish">发布</button>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import initData from '../../common/initData.js'

	// #ifdef APP-PLUS
	import permision from "@/common/permission.js"
	// #endif
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	export default {
		components: {
			uniIcon
		},
		data() {
			return {
				index_grade: 0, //年级的索引值
				index_subject: 0, //学科的索引值
				picker_subject: ['语文', '数学', '英语', '物理', '化学', '生物', "政治", "历史", "地理"],
				picker_grade: ['小学1年级', '小学2年级', '小学3年级', '小学4年级', '小学5年级', '小学6年级', "初中1年级", "初中2年级", "初中3年级", "高中1年级", "高中2年级",
					"高中3年级"
				],
				imageList: [],
				index_img: 0,
				modalName: null,
				price: 0,
				sizeTypeIndex: 1,
				sizeType: ['压缩', '原图', '压缩或原图'],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				textareaAValue: '',
				textContent: '',
				imgList: [],
				taskId: '',
				publishing: false, //点击中

			}
		},
		onShow() {
			this.checkLogin()
			initData.getBalance()
		},
		methods: {
			textareaAInput: function(e) {
				this.textareaAValue = e.detail.value
			},
			changePrice(e) {
				this.price = e.detail.value
			},
			PickerChangeSubject(e) {
				this.index_subject = e.detail.value
			},
			PickerChangeGrade(e) {
				this.index_grade = e.detail.value
			},
			ChooseImage: function() {
				uni.chooseImage({
					count: 9 - this.imgList.length, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', "camera"], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage: function(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg: function(e) {
				this.imgList.splice(e.currentTarget.dataset.index, 1)
				// uni.showModal({
				// 	title: '删除该照片',
				// 	content: '确定要删除这段回忆吗？',
				// 	cancelText: '再看看',
				// 	confirmText: '再见',
				// 	success: res => {
				// 		if (res.confirm) {
				// 		}
				// 	}
				// })
			},
			checkLogin() {
				var account = uni.getStorageSync('account')
				if (!account || account == "custom") {//未登录的时候
					// uni.showModal({
					// 	title: '未登录',
					// 	content: '发布题目需要登陆，点击确定前往登陆或注册',
					// 	success: function(res) {
					// 		if (res.confirm) {
					// 			uni.navigateTo({
					// 				url: "../login/login"
					// 			})
					// 		} else if (res.cancel) {
					// 			uni.navigateBack({
					// 				delta: 1
					// 			})
					// 		}
					// 	}
					// });
				}
			},
			publish() {
				
				this.publishing=true
				var params = {
					account: uni.getStorageSync('account'),
					descText: this.textareaAValue,
					subject: this.index_subject,
					grade: this.index_grade,
					reward: this.price
				}
				
				this.validation().then(()=>{
					this.RWajax.post('/task/publish',params).then(res=>{//生成任务id
						if (res.data.success == true) {
								this.taskId = res.data.result
								this.uploadImg()
							} else {
								this.publishing=false
								uni.showToast({
									title: res.data.message,
									icon: 'none'
								})
							}
					})
				}).catch((err)=>{
					if(err!=""){
						uni.showToast({
							title: err,
							icon: 'none'
						});	
					}
					this.publishing=false
				})
				
				
				
			},


			uploadImgSingle(imgsrc, exdata) {
				//上传单张图片
				//获取图片格式->上传图片->url录入数据库

				const _this = this
				return new Promise(function(resolve, reject) {
					var format //图片格式
					uni.getImageInfo({ //获取图片格式
						src: imgsrc,
						success(res) {
							format = res.type
							uni.uploadFile({
								url: _this.$host + '/file/upload',
								filePath: imgsrc,
								name: 'file',
								formData: {
									fileName: "task/" + exdata.taskId + "/" + exdata.position,
									fileType: format
								},
								success: (res) => {
									var data = JSON.parse(res.data)
									if (data.success == true) { //上传图片成功
										var url = data.result
										//url录入数据库
										_this.RWajax.post("/picture/upload",[{  
												linkerId: exdata.taskId,
												position: exdata.position,
												url: url
											}]).then(res=>{
												if(res.data.success==true){
													resolve(url) //返回url 代表成功
												}else{
													reject(res)
												}
											}).catch(err=>{
												reject(res)
											})
									} else {
										uni.showModal({
											content: "请求失败，请重试",
											showCancel: false
										});
										reject(res)
									}
								},
								fail: (err) => {
									uni.showModal({
										content: err.errMsg,
										showCancel: false
									});
									reject(err)
								}
							});
						}
					})
				})
			},
			async uploadImgAll() {
				//
				const _this = this
				let arr = []
				for (let k = 0; k < this.imgList.length; k++) {
					arr[k] = await _this.uploadImgSingle(_this.imgList[k], {
						taskId: _this.taskId,
						position: k
					})
				}
				return arr;
			},

			uploadImg() {
				var _this = this
				var imgList = this.imgList

				uni.showLoading({
					title: '任务发布中...',
				})
				if (this.imgList.length == 0) { //没有图片
					uni.hideLoading()
					uni.showToast({
						title: '任务发布成功',
						icon: 'success',
						duration: 1000
					})
					setTimeout(function() {
						this.publishing=false
						uni.navigateBack({
							delta: 1
						})
					}, 1000)
				} else {//有图片
					_this.uploadImgAll().then(() => {
						uni.showToast({
							title: '任务发布成功',
							icon: 'success',
							duration: 1000
						})
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					}).catch((err) => {
						uni.showToast({
							title: '任务发布失败，请重试',
							icon: 'none',
							duration: 1000
						})
					}).finally(()=>{
						uni.hideLoading()
						this.publishing=false
					})
			
				}

			},


			async checkPermission(code) {
				let type = code ? code - 1 : this.sourceTypeIndex;
				let status = permision.isIOS ? await permision.requestIOS(sourceType[type][0]) :
					await permision.requestAndroid(type === 0 ? 'android.permission.CAMERA' :
						'android.permission.READ_EXTERNAL_STORAGE');

				if (status === null || status === 1) {
					status = 1;
				} else {
					uni.showModal({
						content: "没有开启权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					})
				}

				return status;
			},
			
			async validation(){
				var params = {
					account: uni.getStorageSync('account'),
					descText: this.textareaAValue,
					subject: this.index_subject,
					grade: this.index_grade,
					reward: this.price
				}
				return new Promise((resolve,reject)=>{
					if(this.textareaAValue.trim()==''){
						reject('任务描述不能为空')
					}
					else if(params.reward<=0){
					 	reject('悬赏的学币须为正整数')
					}
					else if (params.reward > uni.getStorageSync('balance')) {
						uni.showModal({
							title: '金币不足',
							content: `剩余金币(${uni.getStorageSync('balance')||0})不足以发布任务,点击确认前往充值`,
							success: function(res) {
								if (res.confirm) {
									uni.navigateTo({
										url: '../recharge/RWrechart/RWrechart',
									});
								}
							},
						});
						reject('')
					}else{
						resolve()
					}
				})
				
			},
			
			
			handleTextInput(e) {
				this.textContent = e.detail.value;
			},
			handleImageRmove(index) {
				if (index > -1) {
					this.imageList.splice(index, 1);
				}
			}
		},
		onNavigationBarButtonTap() {
			// this.publish()

		}
	}
</script>

<style>
	.cell-pd {
		padding: 22upx 30upx;
	}

	.list-pd {
		margin-top: 50upx;
	}

	.uni-uploader__file {
		position: relative;
	}

	.uni-icon-close {
		position: absolute;
		right: -9px;
		top: -9px;
		z-index: 888;
	}
</style>
