<template>
    <el-card class="box-card" v-cloak>
      <div slot="header" class="clearfix">
        <p>歡迎～請於時限內作答完畢！</p>
        <p>作答時間也會影響分數喔！</p>
        <p>準備好測驗的話就開始吧！</p>
      </div>
      <MainPage :page-name='"home"'></MainPage>
    </el-card>
</template>

<script>
import MainPage from "../../components/MainPage";

export default {
  name: "home",
  data() {
    return {
      userList: []
    };
  },
  components: {
    MainPage
  }
};
</script>
<style scoped>
.box-card{
    text-align: center;
}
</style>
