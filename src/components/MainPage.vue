<template>
    <div v-cloak>
		<div v-if="pageName==='item'">
            <el-card class="box-card" v-if="itemNum>0">
                <div slot="header" class="clearfix">
                    <span>剩餘時間：<span :class="{timeTransform:timeNum<=10}">{{timeNum}}</span> 秒</span>
                </div>
                <div>
                    作答進度：<el-progress :stroke-width="10" :percentage="(itemNum/questions.length)*100" :show-text="false"></el-progress>
                </div>
                <br/>
                <span>題目{{itemNum}}：<pre>{{questions[itemNum-1].question}}</pre></span>
                <div style="padding: 5px;" v-for="item in questions[itemNum-1].options" :key="item.id">
                    <a :class="{option:chooseNum===item.id}" @click="chooseAnswer(item.id)">{{chooseText(item.id)}}</a>
                    <span>{{item.text}}</span>
                </div>
                <div style="padding-top:40px;">
                    <el-button-group>
                        <el-button type="success" icon="el-icon-arrow-left" v-if="checkItemNum" @click="submit">提交</el-button>
                        <el-button type="info" @click="nextPage" :disabled="checkItemNum">下一頁<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                    </el-button-group>
                </div>
            </el-card>
		</div>
		<div v-if="pageName==='home'" class="startBtnDiv">
			<el-button type="primary" class="startBtn" icon="el-icon-edit" :loading="loading" @click="homePage">開始作答</el-button>
		</div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
    props: {
        pageName: String,
        list: Array
    },
    data() {
        return {
            loading: false,
            chooseNum: null,
        };
    },
    methods: {
        ...mapActions([
            "addItemNum", "initData", "endPage", "updateAnswer"
        ]),
        nextPage() { //按下『下一頁』檢查是否有選擇答案
            if (this.chooseNum===null) {
                this.showErrorMsg();
                return;
            }
            this.chooseNum = null;
            this.addItemNum();
        },
        homePage() { //首頁進入到測驗畫面第一頁(其實只是要跑個loading效果而已)
            this.loading = true;
            setTimeout(() => {
                this.addItemNum();
                this.$router.push("item");
            }, 1000);
        },
        submit() {  //送至結算畫面
            if (this.chooseNum===null) {
                this.showErrorMsg();
                return;
            }
            this.chooseNum = null;
            this.endPage();
            this.$router.push("score");
        },
        chooseAnswer(id) { //記錄每一題選擇的答案
            this.chooseNum = id;
            this.updateAnswer(id);
        },
        chooseText(id) {
            switch(id){
                case 0: return 'A';
	  			case 1: return 'B';
	  			case 2: return 'C';
	  			case 3: return 'D';
            }
        },
        showErrorMsg(){ //顯示錯誤訊息
            this.$message({
                showClose: true,
                duration: 800,
                message: '還沒選擇答案哦！',
                type: 'error'
            });
        }
    },
    computed: {
        ...mapGetters([
            "itemNum", "timeNum", "questions", "userAnswer", "time"
        ]),
        checkItemNum() {
            return this.itemNum === this.questions.length ? true : false; //檢查是否為最後一題
        }
    },
    watch:{
        timeNum(){
            if(this.timeNum===0){  //時間截止直接返回計分畫面
                this.endPage();
                this.$router.push("score");
            }
        }
    },
    mounted() {
        if(this.itemNum===0){  //使用者重新整理畫面就返回第一頁並初始化數據
            this.initData();
            this.$router.push("home");
        }else if(this.timeNum===0||this.time===null){
            this.endPage();
            this.$router.push("score");
        }else{   //測驗開始時，若使用者按上一頁，會強制返回當前題目畫面
            this.$router.push("item");
        }
    }
};
</script>
<style>
.image {
    width: 100%;
    display: block;
}
body,html {
    width:50%; 
    margin: auto;
    padding: 10px;
}
.timeTransform {
    color: red;
}
.option{
    background-color:#4fc08d;
}
a{
    border-radius:99em;
    display: inline-block;
    border: 1px solid rgb(0, 0, 0);
    width: 22px;
	height: 22px;
    padding: 1px;
    margin-right: 5px;
    text-align: center;
}
.startBtnDiv{
    text-align: center;
}
</style>

