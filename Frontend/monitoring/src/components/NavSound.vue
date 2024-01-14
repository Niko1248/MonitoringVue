<template lang="">
  <div class="sound">
    <img class="sound__ico ico" src="../assets/SETTINGS.svg" @click="showSoundItems" alt="звук">
    <transition name="fade">
      <div class="sound__items" v-if="isSoundItems">
				<div class='reset' @click="$store.commit('disableSound')">
					<img class="reset_ico ico" src="../assets/RESET.svg" alt=""> <!-- Кнопка сброса звука -->
				</div>
				<div class='reset' @click="muteSound"> <!-- Кнопка отключения звука -->
					<img class="reset_ico ico" src="../assets/RESET.svg" alt="">
				</div>
			</div>
    </transition>
  </div>
</template>
    
<script>
import sound from '../assets/alert.mp3'
const audio = new Audio(sound)
audio.loop = true

export default {
	data() {
			return {
					isSoundItems: false,
					muteAudio: false
			}
	},
	methods: {
			showSoundItems() {
					this.isSoundItems = !this.isSoundItems
			},
			muteSound() {
				this.muteAudio = !this.muteAudio
				audio.muted = this.muteAudio
			}
	},
	computed: {
	sound() {
		return this.$store.state.soundEnable
	}
	},
	watch:{
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

.sound {
    position: relative;
}

.sound__ico {
    margin-right: 25px;
    width: 20px;
    cursor: pointer;
}
.sound__items {
    position: absolute;
    bottom: -111px;
    width: 130px;
    left: -36px;
    background: #0E1621;
    background-size: cover;
    background-repeat: no-repeat;
    padding: 10px 20px 10px 20px;
    border-radius: 0px 0px 10px 10px;
    color: #fff;

    &::before {
        content: "";
        display: block;
        position: absolute;
        width: 13px;
        height: 13px;
        left: -13px;
        bottom: 98px;
        background-image: url(./../assets/img/nav/left.png);
    }

    &::after {
        content: "";
        display: block;
        position: absolute;
        width: 13px;
        height: 13px;
        right: -13px;
        bottom: 98px;
        background-image: url(./../assets/img/nav/right.png);
    }

    div {
        display: flex;
        margin-bottom: 10px;

        input,
        .plus__ico {
            margin-right: 10px;
        }
    }
}
</style>
    