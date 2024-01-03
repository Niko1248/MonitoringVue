<template lang="">
<div class="nav">
		<div class="logo">
			<img src="../assets/LOGO.svg" alt="">
			<p class="logo_text">ониторинг</p>
		</div>
		<div class="menu">
			<img class="search" src="../assets/SEARCH.svg" @click="showSearch" alt="Поиск">
			<input 
				v-if="isSearch" 
				type="text" 
				v-model="searchQuery"
				@input = updateInput
			>
			<div class="log_text">Log</div>
			<img class="settings" src="../assets/SETTINGS.svg" alt="">
			<img src="../assets/PRINT.svg" alt="">
			<div class='test' @click="$store.commit('disableSound')">Сброс</div>
		</div>
		<div class="auth">
			<a class="auth_text" href="">user</a>
			<img src="../assets/USER.svg" alt="">
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			isSearch: false,
			searchQuery: ''
		}
	},
	props:{

	},
	methods: {
		showSearch() {
			this.isSearch = !this.isSearch
		},
		updateInput() {
			this.$emit('input-change', this.searchQuery)
		}
	}
}
</script>
<style scoped>
	.nav{
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #0E1621;
	padding: 5px 20px;
}
.logo{
	display: flex;
	align-items: center;
}
.logo_text{
	font-size: 20px;
	text-decoration: none;
	color: white;
}
.menu{
	display: flex;
	align-items: center;
}
.log_text{
	color: white;
	font-size: 24px;
}
.search, .log_text, .settings{
	margin-right: 2vw;
}
.auth{
	display: flex;
	align-items: center;
}
.auth_text{
	margin-right: 10px;
	color: white;
	text-decoration: none;
	text-transform: uppercase;
}
.test{
	color: white;
	cursor: pointer;
}
</style>