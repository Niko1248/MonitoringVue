<template lang="">
	<div class="wrapper">
		<transition-group name='systemList'>
			<SystemItem
				v-for="(system,index) in systems"
				:system = system
				:key = system._id
				:index=index
				:stateSystems=stateSystems
			/>
		</transition-group>

	</div>
</template>


<script>
import SystemItem from './SystemItem.vue';

export default {
	components: {
		SystemItem
	},
	props: {
		systems:{
			type: Array,
			required: true
		},
		stateSystems:{
			type: Array
		},
		inputValue:{
			type: String
		}
	}
}
</script>


<style scoped>
.wrapper{
	padding: 20px;
	display: grid;
	gap: 15px;
}
.systemList-item {
display: inline-block;
margin-right: 10px;
}
.systemList-enter-active,
.systemList-leave-active {
  transition: all 0.4s ease;
}
.systemList-enter-from,
.systemList-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.systemList-move {
  transition: transform 0.6s ease;
}
</style>