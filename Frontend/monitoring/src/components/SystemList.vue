<template lang="">
	<div class="wrapper">
		<transition-group name='systemList'>
			<SystemItem				
				v-for="system in systems"
				:system = system
				:key = system._id
				:inputValue = inputValue
			/>
		</transition-group>
		<transition-group name='addSP'>
			<AddSystem
		v-if="this.$store.state.popupAddSP"
		/>
		</transition-group>
		<AddSystem
		v-if="this.$store.state.popupAddSP"
		/>
	</div>
</template>


<script>
import SystemItem from '../components/SystemItem.vue';
import AddSystem from '../components/AddSystem.vue';



export default {
	components: {
		SystemItem,
		AddSystem
	},
	props: {
		systems: {
			type: Array,
			required: true
		},
		inputValue: {
			type: String
		}
	},

}
</script>


<style scoped>
.wrapper {
	padding: 20px;
	display: flex;
	gap: 14px;
	flex-direction: column;
	flex-wrap: wrap;
	max-height: 90vh;
	align-content: flex-start
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


.addSP-enter-active,
.addSP-leave-active {
	transition: all 0.4s ease;
}

.addSP-enter-from,
.addSP-leave-to {
	opacity: 0;
	transition: all 0.2s ease;
}

.addSP-move {
	transition: transform 0.6s ease;
}
</style>