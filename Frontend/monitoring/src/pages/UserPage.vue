<template>
	<NavMenu
		@input-change="updateInputValue"
	/>
	<SystemList
		:systems = searchedSystems
		:stateSystems=stateSystems
	/>
</template>


<script>
import NavMenu from '../components/NavMenu.vue';
import SystemList from '../components/SystemList.vue';
import axios from 'axios'


export default {
	components: { NavMenu, SystemList},
	data(){
		return{
			systems: [],
			stateSystems: [],
			enableSound: false,
			inputValue: ''
		}
	},
	methods: {
		async fetchSystems() {
			try{
				const response = await axios.get('http://192.168.0.108:80/api/router/systems')
				this.systems = response.data
			}catch(e){
				console.log(e.message);
			}
		},
		async readPinInfo() {
			try{
				const response = await axios.get('http://192.168.0.108:80/readPinInfo')
				this.stateSystems = response.data
			}catch(e){
				console.log(e);
			}
		},
		updateInputValue(value){
			this.inputValue = value
		}
	},
	computed:{
		searchedSystems() {
			return this.systems.filter(system => /^\d*$/.test(this.inputValue) ? system.number.includes(this.inputValue): system.correspondent.includes(this.inputValue))
		}
	},
	watch:{
		inputValue(value){
			this.inputValue = value
			console.log(value);
		},
		stateSystems(newVal){
			if(!newVal.includes(1)){
				this.$store.commit('disableSound')
			}
		},
	},
	mounted() {
		this.fetchSystems()
		this.readPinInfo()
		this.interval = setInterval(() => {
			this.readPinInfo()
		}, 3000)
	},
	beforeDestroy() {
		clearInterval(this.interval)
	},
}
</script>
<style scoped>
	
</style>