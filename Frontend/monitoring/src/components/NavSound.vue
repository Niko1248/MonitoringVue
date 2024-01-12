<template lang="">
    <div class="sound">
        <img class="sound__ico ico" src="../assets/" @click="showSettingItems" alt="звук">
        <transition name="fade">
            <div class="nav__item">
			<div class='reset' @click="$store.commit('disableSound')">
				<img class="reset_ico ico" src="../assets/RESET.svg" alt="">
			</div>
			
		</div>
        </transition>
    </div>
    </template>
    
<script>

export default {
    data() {
        return {
            isSettingItems: false,
        }
    },

    props: {

    },
    methods: {
        showSettingItems() {
            this.isSettingItems = !this.isSettingItems
        },
    },
    computed: {
        workSorted: {
            get() {
                return this.$store.state.workSorted;
            },
            set(value) {
                this.$store.commit('disableWorkSorted', value);
            }
        },
        alarmSorted: {
            get() {
                return this.$store.state.alarmSorted;
            },
            set(value) {
                this.$store.commit('disableAlarmSorted', value);
            }
        }
    }
}
</script>
    
<style lang="scss" scoped></style>
    