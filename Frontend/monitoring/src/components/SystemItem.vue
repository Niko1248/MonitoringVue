<template>
	<div class="system" :style="{backgroundColor: stateSystems[index] == 1 ? 'green' : 'red'}">
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
import sound from '../assets/alert.mp3'

const audio = new Audio(sound)
audio.loop = true


export default {
	data(){
		return{
			
		}
	},
	methods:{

	},
	props: {
		system:{
			type: Object,
			required: true
		},
		index:{
			type: Number
		},
		stateSystems:{
			type: Array
		},
	},
	computed: {
		systemStatus() {
			return this.stateSystems[this.index]
		},
		sound() {
			return this.$store.state.soundEnable
		}
	},
	watch:{
		systemStatus(newVal){
			if(newVal === 1 && this.$store.state.soundEnable === false){
				this.$store.commit('enableSound')
			}
		},
		sound(newVal){
			if(newVal === false){
				audio.pause()
			}else{
				audio.play()
			}
		}
		
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