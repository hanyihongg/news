<template>
	<view class="icons" @click.stop="likeTap">
		<uni-icons size="20" color="#f07373" :type="like?'heart-filled':'heart'"></uni-icons>
	</view>
</template>

<script>
	export default {
		props:{
			item:{
				type:Object,
				default(){
					return {}
				}
			},
			types:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				like:false,
			};
		},
		watch:{
			item(newValue){
				this.like=newValue.is_like
			},
		},
		created() {
			this.like=this.item.is_like
		},
		methods:{
			likeTap(){
				this.like=!this.like;
				this.updateLikes();
			},
			updateLikes(){
				let that= this
				uni.showLoading()
				this.$api.update_likes({
					user_id:'5fc44c5ad505f70001e0c299',
					article_id:this.item._id
				}).then(res=>{
					uni.hideLoading();
					uni.showToast({
						title:that.like?'收藏成功':'取消收藏',
						icon:'none'
					})
					uni.$emit('update_article',this.types)
				}).catch(err=>{
					uni.hideLoading();
				})
			}
		}
	}
</script>

<style lang="scss">
	.icons{
		position: absolute;
		right: 0;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20px;
		height: 20px;
	}
</style>
