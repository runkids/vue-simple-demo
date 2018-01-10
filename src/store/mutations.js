//mutation 必須為同步函數
//在vue裡調用：this.$store.commit('initData')
export default {
	initData(state) {
		state.timeNum = 60;
		state.itemNum= 0;
		state.time = null;
		state.userAnswer = [];
	},
	addItemNumber(state, num) {
		state.itemNum += num;
	},
	deleteItemNumber(state, num) {
		state.itemNum -= num;
	},
	startTime(state) {
		state.time = setInterval(() => {
			state.timeNum--;
		}, 1000);
	},
	endTime(state) {
		clearInterval(state.time);
		state.time = null;
	},
	updateAnswer(state, ans){
		let index = state.itemNum;
		state.userAnswer[index-1]=ans;
	}
}