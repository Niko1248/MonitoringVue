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
import Config from '../../config/index.js';


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
				const response = await axios.get(`${Config.SERVER_URL}/api/systems/getSystems`)
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
			return this.sortedSystems.filter(system => /^\d*$/.test(this.inputValue) ? system.number.includes(this.inputValue): system.correspondent.toLowerCase().includes(this.inputValue.toLowerCase()))
		},
		sortedSystems() {
			if (this.$store.state.workSorted){
				return this.systems.filter(system => system.state === "В работе")
			}else if (this.$store.state.alarmSorted){
				return this.systems.filter(system => system.state === "Авария")
			}else{
				return this.systems
			}
			
		}
	},
	watch:{
		inputValue(value){
			this.inputValue = value
		},
		// stateSystems(newVal){ 								Надо переделать 
		// 	if(!newVal.includes('Авария')){
		// 		this.$store.commit('disableSound')
		// 	}
		// },
	},
	mounted() {
		const eventSource = new EventSource(`${Config.SERVER_URL}/state`);

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