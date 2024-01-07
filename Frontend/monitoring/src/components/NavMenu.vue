<template lang="">
<div class="nav">
		<div class="logo">
			<img src="../assets/LOGO.svg" alt="">
			<p class="logo_text">ониторинг</p>
		</div>
		<div class="menu">
			<input type="checkbox" id='workSorted' v-model="workSorted">
			<label for="workSorted">Исправные</label>
			<input type="checkbox" id='alarmSorted' v-model="alarmSorted">
			<label for="alarmSorted">Неисправные</label>
			<img class="search" src="../assets/SEARCH.svg" @click="showSearch" alt="Поиск">
			<input 
				v-if="isSearch" 
				type="text" 
				v-model="searchQuery"
				@input = updateInput
			>
			<div class="log_text">Log</div>
			<img class="settings" src="../assets/SETTINGS.svg" alt="">
			<img class="printPage" src="../assets/PRINT.svg" alt="">
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
			searchQuery: '',
		}
	},
	props: {

	},
	methods: {
		showSearch() {
			this.isSearch = !this.isSearch
		},
		updateInput() {
			this.$emit('input-change', this.searchQuery)
		}
	},
	computed: {
    workSorted: {
      get() {
        return this.$store.state.workSorted;
      },
      set(value) {
        this.$store.commit('disableWorkSorted', value);
      }
    },
    alarmSorted: {
      get() {
        return this.$store.state.alarmSorted;
      },
      set(value) {
        this.$store.commit('disableAlarmSorted', value);
      }
    }
  }
}
</script>
<style scoped lang="scss">
.nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #0E1621;
	padding: 5px 20px;
	font-family: Wix Madefor Display;


}

.logo {
	display: flex;
	align-items: center;

	img {
		width: 40px;
		height: 40px;
	}

}

.logo_text {
	font-size: 20px;
	text-decoration: none;
	color: white;

}

.menu {
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 30%;
}

.log_text {
	color: white;
	font-size: 24px;
}

.search,
.log_text,
.settings,
.printPage {
	width: 20px;
}

.auth {
	display: flex;
	align-items: center;
}

.auth_text {
	margin-right: 10px;
	color: white;
	text-decoration: none;
	text-transform: uppercase;
}

.test {
	color: white;
	cursor: pointer;
}
</style>