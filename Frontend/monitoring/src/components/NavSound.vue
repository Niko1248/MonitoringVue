<template lang="html">
  <div class="sound">
    <component
      :is="isSoundOn ? 'SoundOn' : 'SoundOff'"
      class="ico"
      @click="showSoundItems" />

    <transition name="fade">
      <div
        class="sound__items popup"
        v-if="this.$store.state.NavPopups.soundItems">
        <component
          :is="isSoundOn ? 'SoundOff' : 'SoundOn'"
          class="sound__item ico"
          @click="toggleSoundState" />
        <SoundR
          class="sound__item ico"
          @click="$store.commit('disableSound')" />
      </div>
    </transition>
  </div>
</template>

<script>
  import sound from '../assets/alert.mp3'
  import SoundOff from '../assets/img/nav/sound_Off.vue'
  import SoundOn from '../assets/img/nav/sound_On.vue'
  import SoundR from '../assets/img/nav/sound_R.vue'
  const audio = new Audio(sound)
  audio.loop = true

  export default {
    data() {
      return {
        muteAudio: false,
        isSoundOn: false
      }
    },
    components: {
      SoundOff,
      SoundOn,
      SoundR
    },
    methods: {
      toggleSoundState() {
        this.isSoundOn = !this.isSoundOn // Переключаем состояние звука
      },
      toggleSound() {
        this.isSoundOn = !this.isSoundOn
      },
      showSoundItems() {
        this.$store.commit('closeAllPopups', 'soundItems')
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
    watch: {
      sound(newVal) {
        if (newVal === false) {
          audio.pause()
        } else {
          audio.play()
        }
      }
    }
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

  .ico {
    cursor: pointer;
    filter: drop-shadow(0px 0px 0px #00000000);
  }

  .sound {
    position: relative;

    svg:first-child {
      width: 36px;
    }
  }

  .sound__ico {
    margin-right: 25px;
    width: 20px;
    cursor: pointer;
  }

  .sound__items {
    position: absolute;
    bottom: -95px;
    width: 16px;
    left: -6px;
    background: #0e1621;
    background-size: cover;
    background-repeat: no-repeat;
    padding: 13px 20px 10px 20px;
    border-radius: 0px 0px 10px 10px;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;

    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 13px;
      height: 13px;
      left: -13px;
      bottom: 73px;
      background-image: url(./../assets/img/nav/left.png);
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 13px;
      height: 13px;
      right: -13px;
      bottom: 73px;
      background-image: url(./../assets/img/nav/right.png);
    }
  }

  .sound__item {
    margin-bottom: 15px;
    width: 36px;

    &:last-child {
      margin-bottom: 5px;
      margin-right: 5px;
      width: 28px;
    }
  }
</style>
