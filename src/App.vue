<template>
	<div>
    	<router-view></router-view>
    </div>
</template>

<script>
export default {};
</script>

<style>
body,html{
	width:100%;
	height:100%;
	margin: 0;
	padding: 0;
	background-color:#324057;
	overflow: hidden;
}
.mainContain{
    padding: 10%;
}
.el-card{
	width: 50%;
	margin-left:25%; 
}
@media (min-width: 300px) and (max-width: 500px) {
    .mainContain{
    	padding: 10%;
		padding-top: 20%;
		max-width: 100％;
		left:0%;
		top:0%;
	}
	.el-card{
		width: 100%;
		margin-left:0%; 
	}
}
</style>
