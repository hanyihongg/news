<template>
	<view class="home">
		<navbar></navbar>
		<tab :list="tabList" :tabIndex="tabIndex" @tab="changeTab"></tab>
		<view class="home-list">
			<list :tab="tabList" :activeIndex="tabIndex" @changeSwiper="changeSwiper"></list>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	// import navbar from '@/components/navbar/navbar.vue'
	export default {
		components:{
			//navbar
		},
		computed:{
			...mapState(['userInfo'])
		},
		watch:{
			userInfo(newValue){
				this.getlabel()
			}
		},
		data() {
			return {
				tabList:[],
				tabIndex:0,
				tabItem:null,
			}
		},
		onLoad() {
			uni.$on('labelChange',(res)=>{
				this.tabList = []
				this.tabIndex = 0
				this.getlabel()
			})
			
		},
		methods: {
			changeTab(v){
				console.log(v)
				this.tabIndex=v.index;
				this.tabItem=v.item;
			},
			getlabel(){
				this.$api.get_label().then((res)=>{
					const {data}= res;
					let tablists=data;
					
					tablists.unshift({
						name:'全部'
					})
					this.tabList=tablists;
					console.log(this.tabList)
					
				})
			},
			changeSwiper(v){
				console.log(this.tabList[v])
				this.tabIndex=v;
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}
	.home  {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		.home-list {
			flex:1;
			box-sizing: border-box;
		}
	}
</style>
