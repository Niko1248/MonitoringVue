<template>
	<div class="system" :style="{ backgroundColor: system.state == 'В работе' ? '#278547' : '#7E1313' }"
		v-show="sortedFunc(system, inputValue)">
		<div class="system__number">{{ system.number }}</div>
		<div class="system__correspondent">{{ system.correspondent }}</div>
		<div class="system__KMU">
			<div>КМУ</div>
			<div class="KMU">{{ system.KMU }}</div>
		</div>
		<div class="traces">{{ system.tract }}</div>
	</div>
</template>

<script>

import Config from '../../config/index.js'
import axios from 'axios'

export default {
	data() {
		return {

		}
	},
	methods: {
		async sendLog() {
			await axios.post(
				`${Config.SERVER_URL}/api/logs/addLog`,
				{
					message: `Система передачи ${this.system.number} ${this.system.state}`
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`
					}
				})
				.then((response) => {
					console.log(response);
				})
				.catch((e) => {
					console.log(e);
				})
		},


		sortedFunc(system, inputValue) {
			if (system.state == 'Авария' && this.$store.state.alarmSorted) {
				if (inputValue.includes(system.number) && inputValue != '') {
					return true
				} else if (inputValue.toLowerCase().includes(system.correspondent.toLowerCase()) && inputValue != '') {
					return true
				} else if (inputValue == '') {
					return true
				}
			} else if (system.state === 'В работе' && this.$store.state.workSorted) {
				if (inputValue.includes(system.number) && inputValue != '') {
					return true
				} else if (inputValue.toLowerCase().includes(system.correspondent.toLowerCase()) && inputValue != '') {
					return true
				} else if (inputValue == '') {
					return true
				}
			} else if (this.$store.state.alarmSorted === false && this.$store.state.workSorted === false) {
				if (inputValue.includes(system.number) && inputValue != '') {
					return true
				} else if (inputValue.toLowerCase().includes(system.correspondent.toLowerCase()) && inputValue != '') {
					return true
				} else if (inputValue == '') {
					return true
				}
			}
			else {
				return false
			}
		}
		// async getLog(){
		// 	const response = await axios.get(`${Config.SERVER_URL}/api/logs/getLogs`)
		// 	const data = response.data[0]
		// 	console.log(`${convertDate(data.createdAt)} ${convertTime(data.createdAt)} ${data.message}`);
		// }
	},
	props: {
		system: {
			type: Object,
			required: true
		},
		inputValue: {
			type: String
		}
	},
	computed: {
		systemStatus() {
			return this.system.state
		},
	},
	watch: {
		systemStatus(newVal) {
			if (newVal === 'Авария' && this.$store.state.soundEnable === false) {
				this.$store.commit('enableSound')
			}
			this.sendLog()
			// this.getLog()
		},
	},
}

</script>
<style lang="scss" scoped>
.system {
	color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 15vw;
	font-family: Wix Madefor Display;
	padding: 5px 15px;
	border-radius: 5px;
	cursor: pointer;
	transition: 0.2s;

	&:hover {
		transform: scale(0.99);
		transition: 0.05s;
		opacity: 0.89;
	}
}

.system__number {
	font-family: Viga Regular;
	font-size: 23px;
}

.system__correspondent {
	font-size: 19px;
	text-align: left;
}

.ok {
	background-color: #278547;
}

.crash {
	background-color: #7E1313;
}

.traces {
	border: 1px solid #fff;
	border-radius: 5px;
	padding: 4px;
	min-width: 30px;
	text-align: center;
}
</style>