import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import questions from '../questions/questions'

Vue.use(Vuex)

const state = {
    itemNum: 0, //目前頁數 0代表home
    timeNum: 60,  //可作答秒數
    time: null,
    userAnswer: [], //記錄每一題選擇答案
    questions,  //題目
}

//建議透過getters取state
const getters = {
    itemNum:(satae)=>state.itemNum,
    timeNum:(satae)=>state.timeNum,
    userAnswer:(satae)=>state.userAnswer,
    questions:(satae)=>state.questions,
    time:(satae)=>state.time,
}

//每次呼叫mutation時監看
//https://vuex.vuejs.org/en/plugins.html 官網
const myPlugin = store => {
    // called when the store is initialized
    store.subscribe((mutation, state) => {
        // called after every mutation.
        // The mutation comes in the format of `{ type, payload }`.
        //console.log('mutation=',mutation);
    })
}

export default new Vuex.Store({
    plugins: [myPlugin],
    state,
    getters,
    actions,
    mutations,
    //strict: true
})
