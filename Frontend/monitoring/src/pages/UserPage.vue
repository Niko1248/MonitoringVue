<template>
	<NavMenu
		@input-change="updateInputValue"
	/>
	<SystemList
		:systems = searchedSystems
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
			enableSound: false,
			inputValue: ''
		}
	},
	methods: {
		async fetchSystems() {
			try{
				const response = await axios.get('http://192.168.0.110:80/api/router/systems')
				this.systems = response.data
			}catch(e){
				console.log(e.message);
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
		// stateSystems(newVal){ 								Надо переделать 
		// 	if(!newVal.includes('Авария')){
		// 		this.$store.commit('disableSound')
		// 	}
		// },
	},
	mounted() {
		const eventSource = new EventSource('http://192.168.0.110/state');

		eventSource.onmessage = (event) => {
			const stateSystemUpdated = JSON.parse(event.data);
			const systemUpdate = this.systems.find(system => system.pin == stateSystemUpdated.pin)
				if (systemUpdate) {
					systemUpdate.state = stateSystemUpdated.state
				}
		};

		this.fetchSystems()
	},
}
</script>
<style scoped>
	
</style>