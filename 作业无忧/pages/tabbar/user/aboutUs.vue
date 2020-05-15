<template>
	<view class="">
		<view class="" v-html='content'></view>
	</view>
</template>

<script>
	export default {
		name:"aboutUs",
		data(){
			return{
				content:""
			}
		},
		onLoad() {
			this.getContent()
		},
		methods:{
			getContent(){
				this.RWajax.get('/backstage/aboutus/query').then(res=>{
					this.content=res.data.result
				})
			}
		}
	
	
	}
	
	
</script>

<style>
</style>
