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
				console.log(123123);
				this.RWajax.get('/backstage/aboutus/query').then(res=>{
					console.log(res);
					this.content=res.data.result
				})
			}
		}
	
	
	}
	
	
</script>

<style>
</style>
