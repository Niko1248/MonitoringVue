<template lang="">
	<div class="container" >
		<div class="wrapper"ref="scrollContainer" @wheel="onWheel">
			<transition-group name='systemList'>
				<SystemItem				
					v-for="system in systems"
					:system = system
					:key = system._id
					:inputValue = inputValue
				/>
			</transition-group>

			<transition-group name='add'>
				<AddSystem
				class="popup"
			v-if="this.$store.state.popups.popupAddSP"
			/>
			</transition-group>
			
			<transition-group name='add'>
				<RegistrationForm
				class="popup"
			v-if="this.$store.state.popups.popupRegistration"
			/>
			</transition-group>
		</div>
	</div>
</template>


<script>
import SystemItem from '../components/SystemItem.vue';
import AddSystem from '../components/AddSystem.vue';
import RegistrationForm from '../components/RegistrationForm.vue';

export default {

	components: {
		SystemItem,
		AddSystem,
		RegistrationForm
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
	computed: {
		isPopupOpen() {
			return this.$store.getters.isAnyPopupOpen;
		}
	}, methods: {
		onWheel(e) {
			if (!this.isPopupOpen) {
				this.$refs.scrollContainer.scrollLeft += e.deltaY;
			} else {
				e.preventDefault();
			}
		},
	}
}
</script>


<style scoped>
.container {
	width: 100%;
	overflow-x: auto;
	max-height: 100vh;
	white-space: nowrap;
}

.wrapper {
	padding: 20px;
	display: flex;
	width: auto;
	gap: 13px;
	flex-direction: column;
	flex-wrap: wrap;
	max-height: calc(100vh - 90px);
	align-content: flex-start;
	overflow-x: auto;
	position: relative;

	&::-webkit-scrollbar {
		display: none;
	}
}

.popup {
	position: fixed;
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


.add-enter-active,
.add-leave-active {
	transition: all 0.4s ease;
}

.add-enter-from,
.add-leave-to {
	opacity: 0;
	transition: all 0.2s ease;
}

.add-move {
	transition: transform 0.6s ease;
}
</style>