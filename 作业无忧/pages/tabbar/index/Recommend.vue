<template>
	<view class="box">
		<rich-text class="content" :nodes='content'></rich-text>
	</view>
</template>

<script>
	export default {
		name: "aboutUs",
		data() {
			return {
				content: "",
				recmdId: "",
				allData: {}
			}
		},
		onLoad(options) {
			this.recmdId = options.id
			// console.log(options.id);
			this.getContent()
		},
		methods: {
			getContent() {
				var _this = this
				this.RWajax.get('/recmd/query/id?recmdId=' + this.recmdId).then(res => {
					var content = res.data.result.content.replace(/&amp;/g, "&")
					const regex = new RegExp('<img', 'gi');
					this.content = content.replace(regex, `<img style="max-width: 100%;object-fit:cover;"`);
				})
			}
		}


	}
</script>

<style>
	image {
		max-width: 100%;
		object-fit: cover;
	}
</style>

<style scoped>
	.box {
		padding: 20upx;
		overflow: hidden;
	}

	.content {
		/* overflow: hidden; */
	}

	.content img {
		max-width: 90% !important;
		object-fit: cover;
	}
</style>
