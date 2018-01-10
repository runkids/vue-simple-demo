<template>
    <div v-cloak>
        <MainPage :page-name='"item"' :list='userList'></MainPage>
    </div>
</template>

<script>
import MainPage from "../../components/MainPage";

export default {
	name: "item",
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

</style>
