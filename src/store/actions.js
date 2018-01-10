//action 可以非同步 僅限 return Promise
//action 執行的是 mutation，不是直接更改state
//vue裡調用：this.$store.dispatch('initData')
export default {
	addItemNum({ commit, state }) {
		if (state.time === null) {
			commit('startTime');
		}
		commit('addItemNumber', 1);
	},
	delItemNum({ commit }) {
		commit('deleteItemNumber', 1);
	},
	initData({ commit }) {
		commit('initData');
	},
	endPage({ commit }) {
		commit('endTime');
	},
	updateAnswer({commit},ans){
		commit('updateAnswer',ans);
	}
}