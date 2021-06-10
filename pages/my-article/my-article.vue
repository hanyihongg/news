<template>
	<view>
		<uni-load-more v-if="articleList.length === 0 && loading" status="loading" iconType="snow"></uni-load-more>
		<list-card v-for="item in articleList" :key="item.id" :item="item"></list-card>
		<view v-if="articleList.length<=0 && !loading" class="no-data">
			当前暂无数据
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				articleList:[],
				loading:true,
			}
		},
		onLoad(){
			this.getMyarticle();
		},
		methods: {
			getMyarticle(){
				this.$api.get_my_article().then(res=>{
					const{data}=res
					this.articleList=data;
					this.loading=false
				})
			}
		}
	}
</script>

<style lang="scss">
	.no-data {
		width: 100%;
		text-align: center;
		padding: 50px 0;
		color: #999;
		font-size: 14px;
	}
</style>
