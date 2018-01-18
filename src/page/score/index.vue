<template>
	<div class='mainContain'>
		<el-card class="box-card" v-cloak>
			<div class="innerDiv">
				<span v-if='status==="exception"?true:false'>未完成作答</span>
				<span v-else>完成作答</span>
				<el-progress :stroke-width="10" :percentage="(itemNum/answer.length)*100" :status="status"></el-progress><br/>
				<div>
					答對題數：{{countAns===answer.length?"全對了！":countAns}}
				</div><br/>
				<div>
					作答剩餘時間：{{timeNum}}秒
				</div><br/>
				<div>
					<div v-for="(item,index) in andList" :key="index">
						題目 {{index+1}}：<span :style="{color:item==='O'?'green':'red'}">{{item}}</span>
					</div>
				</div><br/>
				<div>
					<el-rate v-model="startNum" show-text disabled text-color="#4fc08d" :texts="scoreMsg"></el-rate>
				</div><br/>
				<el-button class="reBtn" type="warning" icon="el-icon-refresh"  @click="reloadPage" plain>重新測驗</el-button>
			</div>
		</el-card>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
	data() {
		return {
			answer: [1, 2, 0, 1, 1, 0], //正確答案
			scoreMsg:['請先熟悉基本概念喔！','需要多多加強喔！','唉唷！還不錯喔！','不錯喔！差一點點了！','全對！高手喔！'],
			countAns: 0, //答對題數
			status:'success',
			score:0,  //分數
			startNum:0.2, //星星數量
			andList:[]
		};
	},
	name: "score",
	methods: {
		...mapActions([
			"initData"
		]),
		reloadPage() {	//重整回到首頁並初始化數據
			this.$router.push("home");
			this.initData();
		},
		calculateScore(time , ans) {
			if(time<=10){
				this.score += 4 * ans;
			}
			if(time>10 && time<=30){
				this.score += 3 * ans;
			}
			if(time>30 && time<=59){
				this.score += 2 * ans;
			}
			if(time>59){
				this.score += ans;
			}
		}
	},
	computed: {
		...mapGetters([
			"itemNum", "timeNum", "userAnswer"
		])
	},
	mounted() {
		if (this.itemNum === 0) {
			this.reloadPage();
		}
	},
	created(){
		let vm = this;
		vm.userAnswer.forEach((item, index) => {  //計算對的題數
			if (item === vm.answer[index]) {
				this.andList.push('O');
				vm.countAns++;
			}else{
				this.andList.push('X');
			}
		});
		if(this.andList.length!==vm.answer.length){
			for(let i = this.andList.length ; i <vm.answer.length;i++){
				this.andList.push(`未選擇`);
			}
		}
		if(vm.userAnswer.length!==vm.answer.length){
			vm.status="exception"
		}
		vm.calculateScore(60-vm.timeNum,vm.countAns); //計算成績
		vm.startNum += vm.score/24*5; //計算星星數
	}
};
</script>
<style scoped>
body,html{
	width:50%; 
	margin: auto;
	padding-top: 10px;
}
.innerDiv {
	text-align: center;
}
</style>
