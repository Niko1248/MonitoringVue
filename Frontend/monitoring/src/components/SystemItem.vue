<template>
	<div class="system" :style="{backgroundColor: system.state == 'В работе' ? 'green' : 'red'}">
		<div class="system__number">{{ system.number }}</div>
		<div class="system__correspondent">{{ system.correspondent }}</div>
		<div class="system__KMU">
			<div>КМУ</div>
			<div>{{ system.KMU }}</div>
		</div>
		<div class="OLT">ОЛТ</div>
	</div>
</template>
<script>
import Config from '../../config/index.js'
import axios from 'axios'
import {convertDate, convertTime} from '../utils/convertDate.js'



export default {
	data(){
		return{
			
		}
	},
	methods:{
		async sendLog(){
			await axios.post(`${Config.SERVER_URL}/api/logs/addLog`, {
				message: `Система передачи ${this.system.number} ${this.system.state}`
			})
			.then((response) => {
				console.log(response);
			})
			.catch((e) => {
				console.log(e);
			})
		},
		// async getLog(){
		// 	const response = await axios.get(`${Config.SERVER_URL}/api/logs/getLogs`)
		// 	const data = response.data[0]
		// 	console.log(`${convertDate(data.createdAt)} ${convertTime(data.createdAt)} ${data.message}`);
		// }
	},
	props: {
		system:{
			type: Object,
			required: true
		},
	},
	computed: {
		systemStatus() {
			return this.system.state
		},
	},
	watch:{
		systemStatus(newVal){
			if(newVal === 'Авария' && this.$store.state.soundEnable === false){
				this.$store.commit('enableSound')
			}
			this.sendLog()
			// this.getLog()
		},
	},
}

</script>
<style scoped>
	.system{
		color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 15vw;

		padding: 5px 15px;
		border-radius: 5px;
	}
	.ok{
		background-color: green;
	}
	.crash{
		background-color: red;
	}
</style>