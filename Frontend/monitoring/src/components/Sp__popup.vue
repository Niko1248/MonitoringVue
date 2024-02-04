<template lang="html">
    <div class="SystemP">
        <div class="Sp__wrapper popup">
            <div class="close" @click="showPopupSP">
                <img src="./../assets/img/nav/close.svg" alt="закрыть" width="20px">
            </div>
            <div class="Sp__wrapper-header">
                <h1 class="systemNumber">{{ systemData.systemNumber }}</h1>
                <h1 class="systemCorrespondent"> Колибри - {{ systemData.systemCorrespondent }}</h1>
                <p class="systemState"
                    :style="{ backgroundColor: systemData.systemState == 'В работе' ? '#278547' : '#7E1313' }">
                    {{ systemData.systemState }}
                </p>
            </div>
            <div>
                <div class="Sp__content">
                    <div class="Sp__content-items">
                        <!-- сюда впишем загрузку -->
                    </div>
                </div>
                <div class="Sp__note">
                    <textarea cols="30" rows="10" placeholder="Примечания"></textarea>
                </div>
                <div class="Sp__tract">
                    <select></select>
                </div>
            </div>
            <button class="save">Сохранить</button>
        </div>
    </div>
</template>
    
<script>

export default {
    methods: {
        showPopupSP() {
            this.$store.commit('showPopupSp');
        },
    },
    props: {
        systemData: {
            type: Object,
            default: () => ({})
        }
    }
}
</script>
    
<style lang="scss" scoped>
.SystemP {
    font-family: Wix Madefor Display;
    width: 100vw;
    height: 90svh;
    background: rgba(0, 0, 0, 0.887);
    position: fixed;
    left: 0px;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.Sp__wrapper {
    padding: 1.1vw 1.5vw;
    width: 80vw;
    height: 80vh;
    background-color: #0E1621;
    border-radius: 10px;
    filter: drop-shadow(0px 20px 30px rgba(0, 0, 0, 0.4274509804));
}

.close {
    height: 100%;
    width: 3%;
    background: #053429;
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 0px 10px 10px 0px;
    transition: 0.2s ease-in;
    display: flex;
    justify-content: center;
    align-items: center;

    &::before {
        content: "";
        display: block;
        position: absolute;
        width: 13px;
        height: 13px;
        left: -13px;
        bottom: 0px;
        background-image: url(./../assets/img/nav/left-down.svg);

    }

    &::after {
        content: "";
        display: block;
        position: absolute;
        width: 13px;
        height: 13px;
        left: -13px;
        top: 0px;
        background-image: url(./../assets/img/nav/left-top.png);
    }

    &:hover {
        filter: drop-shadow(-2px 0px 5px #ffffff34);
        transition: 0.2s ease-in;

    }
}

.Sp__wrapper-header {
    display: flex;
    align-items: center;
    justify-content: start;
    color: #fff;
    font-family: Wix Madefor Display;
}

.systemNumber {
    font-family: Viga Regular;
    margin-right: 2vw;
    font-size: 3vw;
    font-weight: 100;
}

.systemCorrespondent {
    margin-right: 2vw;
}

.systemState {
    display: block;
    padding: 0.1vw 0.7vw 0.3vw 0.7vw;
    border-radius: 7px;
    margin-top: 5px;
}
</style>
    