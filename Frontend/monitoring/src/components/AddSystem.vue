<template lang="html">
    <div class="outspace">
        <div class="addSP__wrapper popup">
            <div class="close" @click="showPopupAddSP">
                <img src="./../assets/img/nav/close.svg" alt="закрыть" width="20px">
            </div>
            <h1>Добавление системы передачи</h1>
            <div>
                <div class="addSP__wrapper-left">
                    <input type="text" class="Pin" placeholder="Номер Pin +">
                    <input type="text" class="SP" placeholder="Номер СП +">
                    <input type="text" class="correspondent" placeholder="Корреспондент +">
                    <input type="text" class="KMU" placeholder="КМУ / ОМУ +">
                    <select class="reserve">
                        <option value="value1">Добавить вариант + </option>
                    </select>
                </div>
                <div class="addSP__wrapper-right">
                    <button @click="showPopupPayload">Добавить загрузку СП +</button>
                    <textarea cols="30" rows="10" placeholder="Примечания"></textarea>
                </div>
            </div>
            <button class="save">Сохранить</button>
						<AddPayload v-if="this.$store.state.popups.popupPayload"/>
        </div>
    </div>
</template>
    
<script>
import AddPayload from './AddPayload.vue';
export default {
    data() {
        return {
        }
    },
    components: {AddPayload},
    methods: {
        showPopupAddSP() {
            this.$store.commit('showPopupAddSp');
        },
				showPopupPayload() {
            this.$store.commit('showPopupPayload');
        }
    },

}
</script>
    
<style lang="scss" scoped>
.outspace {
    font-family: Wix Madefor Display;
    width: 100vw;
    height: calc(100vh);
    background: rgba(0, 0, 0, 0.887);
    position: fixed;
    left: 0px;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.addSP__wrapper {
    width: 60%;
    background: #0E1621;
    border-radius: 10px;
    padding: 20px 0px 60px 0px;
    position: relative;
    filter: drop-shadow(0px 20px 30px #0000006d);

    h1 {
        color: #F2F1F1;
        font-weight: bold;
        margin-bottom: 30px;
        margin-left: 20px;
    }

    div {
        display: flex;
    }

}

.addSP__wrapper-left {
    display: flex;
    flex-direction: column;
    width: calc(48% - 20px);
    margin-left: 20px;

    input {
        width: 86%;
        height: 35px;
        border: none;
        border-radius: 5px;
        outline: none;
        margin: 7px 0px;
        background: #2E3541;
        color: #F2F1F1;
        padding: 4px 20px 4px 20px;
        font-size: 18px;
        transition: 0.2s ease-in;

        &::placeholder {
            font-size: 18px;
            color: #F2F1F1;
        }

        &:hover {
            filter: drop-shadow(0px 0px 2px #ffffff40);
            transition: 0.2s;

        }

        &:focus {
            filter: drop-shadow(0px 0px 2px #000);
            transition: 0.2s ease-in;

        }
    }

    select {
        width: calc(86% + 40px);
        height: 45px;
        border: none;
        border-radius: 5px;
        outline: none;
        margin: 7px 0px;
        background: #2E3541;
        color: #F2F1F1;
        padding: 4px 0px 6px 20px;
        font-size: 18px;
        color: #F2F1F1;
        transition: 0.2s ease-in;

        &:hover {
            filter: drop-shadow(0px 0px 2px #ffffff40);
            transition: 0.2s;

        }

        &:focus {
            filter: drop-shadow(0px 0px 2px #000);
            transition: 0.2s ease-in;

        }
    }
}

.addSP__wrapper-right {
    display: flex;
    flex-direction: column;
    width: calc(48% - 20px);
    margin-right: 20px;

    button {
        margin: 7px 0;
        width: 100%;
        height: 45px;
        border: none;
        border-radius: 5px;
        margin: 7px 0px;
        background: #2E3541;
        color: #F2F1F1;
        padding: 4px 0px 6px 20px;
        font-size: 18px;
        color: #F2F1F1;
        transition: 0.2s ease-in;
        text-align: left;

        &:hover {
            filter: drop-shadow(0px 0px 2px #ffffff40);
            transition: 0.2s;
						cursor: pointer;
        }

        &:focus {
            filter: drop-shadow(0px 0px 2px #000);
            transition: 0.2s ease-in;

        }
    }

    textarea {
        background: #2E3541;
        border: none;
        min-width: calc(100% - 20px);
        max-width: calc(100% - 20px);
        border-radius: 5px;
        max-height: 47%;
        outline: none;
        color: #F2F1F1;
        padding: 10px;
        font-size: 18px;

        &::placeholder {
            padding: 0px 10px;
            font-size: 18px;
            color: #F2F1F1;
            font-family: Wix Madefor Display;
        }

        &:hover {
            filter: drop-shadow(0px 0px 2px #ffffff40);
            transition: 0.2s;
        }

        &:focus {
            filter: drop-shadow(0px 0px 2px #000);
            transition: 0.2s ease-in;

        }
    }
}

.close {
    height: 100%;
    width: 4%;
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

.save {
    background: #053429;
    outline: none;
    color: #F2F1F1;
    position: absolute;
    bottom: 0;
    left: calc((100% - 130px)/2);
    width: 130px;
    height: 35px;
    border: none;
    border-radius: 10px 10px 0px 0px;
    font-size: 18px;
    transition: 0.2s ease-in;

    &:hover {
        filter: drop-shadow(0px -2px 5px #ffffff34);
        transition: 0.2s ease-in;
        color: #fff;
    }



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
        right: -13px;
        bottom: 0px;
        background-image: url(./../assets/img/nav/right-down.svg);
    }
}
</style>
    