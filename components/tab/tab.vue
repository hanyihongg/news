<template>
	<view class="tab">
		<scroll-view scroll-x class="tab-scroll">
			<view class="tab-scroll__box">
				<view class="tab-scroll__item" v-for="(item, index) in list" 
				:key="index" @click="clickTab(item,index)" :class="{active:activeIndex === index}">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<view class="tab-icons" @click="open">
			<uni-icons type="gear" size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			list:{
				type:Array,
				default(){
					return[]
				}
			},
			tabIndex:{
				type:Number,
				default:0
			}
		},
		watch:{
			tabIndex(newValue,noldValue){
				this.activeIndex=newValue;
			}
		},
		data() {
			return {
				activeIndex:0
			};
		},
		onLoad() {
		},
		methods:{
			open(){
				uni.navigateTo({
					url:"/pages/home-label/home-label"
				})
			},
			clickTab(item,index){

				this.$emit("tab",{
					item:item,
					index:index
				})
			}
					
		}
	}
</script>

<style lang="scss">
	.tab {
			display: flex;
			width: 100%;
			border-bottom: 1px #f5f5f5 solid;
			background-color: #fff;
			box-sizing: border-box;
	
			.tab-scroll {
				flex: 1;
				overflow: hidden;
				box-sizing: border-box;
	
				.tab-scroll__box {
					display: flex;
					align-items: center;
					flex-wrap: nowrap;
					height: 45px;
					box-sizing: border-box;
	
					.tab-scroll__item {
						flex-shrink: 0;
						padding: 0 15px;
						color: #333;
						font-size: 14px;
	
						&.active {
							color: $mk-base-color;
						}
					}
				}
	
				.tab-scroll__box {
					display: flex;
					align-items: center;
					flex-wrap: nowrap;
					height: 45px;
					box-sizing: border-box;
	
					.tab-scroll__item {
						flex-shrink: 0;
						padding: 0 10px;
						color: #333;
						font-size: 14px;
					}
				}
			}
	
			.tab-icons {
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 45px;
	
				&::after {
					content: '';
					position: absolute;
					top: 12px;
					bottom: 12px;
					left: 0;
					width: 1px;
					background-color: #ddd;
				}
			}
		}
</style>
