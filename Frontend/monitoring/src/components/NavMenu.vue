<template lang="">
<div class="nav">
		<div class="logo">
			<img src="../assets/LOGO.svg" alt="">
			<p class="logo_text">ониторинг</p>
		</div>
		<div class="nav__item">
			
			<div class="search">
				<transition name="fade">
					<input 
							v-if="isSearch" 
							type="text" 
							class="search_input"
							v-model="searchQuery"
							@input = updateInput
					>
				</transition>
				<img class="search_ico ico" src="../assets/SEARCH.svg" @click="showSearch" alt="Поиск">
			</div>
			<div class="log_text ico">Log</div>
			
			<NavSettings/>

			<img class="printPage ico" src="../assets/PRINT.svg" alt="">
		</div>
		<div class="nav__item">
			<div class='reset' @click="$store.commit('disableSound')">
				<img class="reset_ico ico" src="../assets/RESET.svg" alt="">
			</div>
			<div class="auth">
				<a class="auth_text" href="">user</a>
				<img class="auth_ico ico" src="../assets/USER.svg" alt="">
			</div>
		</div>
	</div>
</template>
<script>
import NavSettings from './NavSettings.vue';

export default {
	data() {
		return {
			isSearch: false,
			searchQuery: '',
			isSettingItems: false,
		}
	},
	components: {
		NavSettings,
	},
	props: {

	},
	methods: {
		showSearch() {
			this.isSearch = !this.isSearch
		},
		showSettingItems() {
			this.isSettingItems = !this.isSettingItems
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


.search_ico,
.settings,
.printPage,
.reset_ico {
	margin-right: 25px;
	width: 20px;
	cursor: pointer;
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

.search {
	position: relative;
}

.search_input {
	position: absolute;
	width: 182px;
	left: -200px;
	height: 26px;
	border-radius: 10px 10px 0px 10px;
	border: none !important;
	padding-left: 10px;
	font-size: 16px;
	color: #0E1621;

	&:focus {
		outline: none !important;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.search_ico {
	padding-top: 2px;
	width: 18px;
}

.nav__item {
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: auto;
}

.log_text {
	color: white;
	font-size: 20px;
	margin-right: 30px;
	cursor: pointer;
	margin-bottom: 5px;
}





.auth {
	display: flex;
	align-items: center;
}

.auth_ico {
	width: 30px;

}

.auth_text {
	margin-right: 10px;
	color: white;
	text-decoration: none;
	text-transform: uppercase;
}

@media (max-width:768px) {
	.nav__item {
		margin-left: 35%;
	}
}
</style>