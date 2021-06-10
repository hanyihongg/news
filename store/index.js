import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store=new Vuex.Store({
	state:{
		historyList:uni.getStorageSync("__history") || [],
		userInfo:uni.getStorageSync("__userinof")||{},
	},
	mutations:{
		SET_USER_INFO(state,userinfo){
			state.userInfo=userinfo
		},
		SET_HISTORY_LIST(state,history){
			state.historyList=history
		},
		CLEAR_HISTORY(state) {
			state.historyList = []
		}
	},
	actions:{
		set_user_info({commit},userinfo){
			uni.setStorageSync('__userinfo',userinfo)
			commit('SET_USER_INFO',userinfo)			
		},
		set_history({commit,state},history){
			let list = state.historyList;
			list.unshift(history)
			uni.setStorageSync('__history', list)
			commit('SET_HISTORY_LIST',list);
		},
		clearHistory({commit}) {
			uni.removeStorageSync('__history')
			commit('CLEAR_HISTORY')
		}
	}
})

export default store;