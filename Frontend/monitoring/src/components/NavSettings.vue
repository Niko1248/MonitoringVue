<template lang="">
<div class="settings">
    <img class="settings__ico ico" src="../assets/SETTINGS.svg" @click="showSettingItems" alt="Настройки">
    <div class="setting__items" v-if="isSettingItems">
        <input type="checkbox" id='workSorted' v-model="workSorted">
        <label for="workSorted">Исправные</label>
        <input type="checkbox" id='alarmSorted' v-model="alarmSorted">
        <label for="alarmSorted">Неисправные</label>
    </div>
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
}
</script>

<style lang="scss" scoped></style>
