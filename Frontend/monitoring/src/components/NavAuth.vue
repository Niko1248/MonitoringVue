<template lang="html">
    <div class="auth">
        <div class="auth__ico" @click="showAuthItems">
            <p class=" auth_text">user</p>
            <img class="auth_ico ico" src="../assets/USER.svg" alt="">
        </div>
        <transition name="fade">
            <div class="auth__items" v-if="isAuthItems">
                <div>
                    <Exet />
                    <p>Выйти</p>
                </div>
                <div class="setting__item-text">
                    <AddUser />
                    <p>Добавить пользователя</p>
                </div>
            </div>

        </transition>
    </div>
</template>
    
<script>
import Exet from './../assets/img/nav/exet.vue';
import AddUser from './../assets/img/nav/addUser.vue';
export default {
    data() {
        return {
            isAuthItems: false
        }
    },
    methods: {
        showAuthItems() {
            this.isAuthItems = !this.isAuthItems

        },
    },
    components: {
        Exet,
        AddUser
    },
}
</script>
    
<style lang="scss" scoped>
.fade-enter-from {
    transition: 0.2s ease-in-out;
    transform: translateY(-55%) scale(0);
}

.fade-enter-to {
    transition: 0.2s ease-in-out;
    transform: translateY(0%) scale(1);

}

.fade-leave-active {
    transition: 0.2s ease-in-out;
    transform: translateY(0%) scale(1);

}

.fade-leave-from,
.fade-leave-to {
    opacity: 0;
    transition: 0.2s ease-in-out;
    transform: translateY(-55%) scale(0);

}

.auth {
    font-family: Wix Madefor Display;
    font-size: 18px;
    color: #fff;
    position: relative;
}

.auth__ico {
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    p {
        margin-right: 32px;

        &:hover {
            transition: 0.1s ease-in-out;
            text-shadow: 0px 0px 11px #f9fefe;
        }
    }

    img {
        width: 35px;
        margin-right: 30px;
    }
}

.auth__items {
    position: absolute;
    bottom: -108px;
    width: 150px;
    left: -53px;
    background: #0E1621;
    padding: 13px 20px 10px 20px;
    border-radius: 0px 0px 10px 10px;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    div {
        display: flex;

        p {
            margin-left: 10px;

        }
    }

    p {
        cursor: pointer;
        margin-bottom: 10px;
        transition: 0.4s ease-in-out;
        cursor: pointer;

        &:last-child {
            margin-bottom: 5px;
        }

        &:hover {
            transition: 0.1s ease-in-out;
            text-shadow: 0px 0px 11px #f9fefe;
        }


    }

    &::before {
        content: "";
        display: block;
        position: absolute;
        width: 13px;
        height: 13px;
        left: -13px;
        bottom: 88px;
        background-image: url(./../assets/img/nav/left.png);
    }

    &::after {
        content: "";
        display: block;
        position: absolute;
        width: 13px;
        height: 13px;
        right: -13px;
        bottom: 88px;
        background-image: url(./../assets/img/nav/right.png);
    }
}
</style>
    