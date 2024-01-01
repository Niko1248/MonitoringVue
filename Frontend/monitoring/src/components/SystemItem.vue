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
export default {
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