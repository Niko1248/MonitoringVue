<template lang="">
	<div class="wrapper">
		<SystemItem
		v-for="(system,index) in systems"
		:system = system
		:key = system._id
		:index=index
		:stateSystems=stateSystems
	/>
	</div>

</template>


<script>
import SystemItem from './SystemItem.vue';
import axios from 'axios'

export default {
	components: {
		SystemItem
	},
	data(){
		return{
			systems: [],
			stateSystems: []
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
				const response = await axios.get('http://192.168.0.108:80/readPinInfo') //Надо посмотреть про Computed
				this.stateSystems = response.data
			}catch(e){
				console.log(e);
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
	.wrapper{
		padding: 20px;
		display: grid;
		gap: 15px;
	}
</style>