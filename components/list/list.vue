<template>
	<swiper class="home-swiper" :current="activeIndex" @change="changeSwiper">
		<swiper-item v-for="(item,index) in tab" :key=index class="swiper-home">
			<list-item :list="listCatchData[index]" @loadMore="loadMore" :load="load[index]"></list-item>
		</swiper-item>

	</swiper>
</template>

<script>
	import listItem from './list-item.vue';
	export default {
		components:{
			listItem
		},
		props:{
			tab:{
				type:Array,
				default(){
					return[]
				}
			},
			activeIndex:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				list:[],
				current:0,
				listCatchData:{},
				load:{},
				page:1,
				pageSize:10,
			};
		},
		watch:{
			tab(newValue){
				if(newValue.length === 0)
					return
				this.listCatchData = {}
				this.load = {}
				this.getList(this.activeIndex)
			}
		},
		created(){
			//this.getList(0);
			uni.$on('update_article',(e)=>{
				if(e === 'follow'){
					this.listCatchData = {}
					this.load = {}
					this.getList(this.activeIndex)
				}
			})
		},
		methods:{
			loadMore(){
				console.log('出发上啦')
				
				if(this.load[this.activeIndex].loading==='noMore')
					return;
				
				this.load[this.activeIndex].page++;
				this.getList(this.activeIndex);
			},
			changeSwiper(e){
				const detail=e.detail;
				this.$emit('changeSwiper',detail.current);
				// 如果没有数据的时候或者长度为0，才去请求数据
				if(!this.listCatchData[detail.current] || this.listCatchData.length===0)				
					this.getList(detail.current)
			},
			getList(current){
				
				if(!this.load[current]){
					this.load[current]={
						page:1,
						loading:'loading'
					}
				}
				
				this.$api.get_list(
					{
						name:this.tab[current].name,
						page:this.load[current].page,
						pageSize:this.pageSize
					}).then(res=>{
					console.log(res)
					const {data}= res;
					
					if (data.length === 0) {
						let oldLoad = {}
						oldLoad.loading = 'noMore'
						oldLoad.page = this.load[current].page
						this.$set(this.load, current, oldLoad)
						// 强制渲染页面
						this.$forceUpdate()
						return
					}
					
					// this.list=data;	
					let old=this.listCatchData[current] || [];
					
					old.push(...data);
					// this.listCatchData[current]=data;
					this.$set(this.listCatchData,current,old);
				})
			}
		}
	}
</script>

<style lang="scss">
	.home-swiper{
		height: 100%;
		.swiper-home{
			height: 100%;
			overflow: hidden;
			.list-scroll{
				height: 100%;
			}
		}
	}
</style>
