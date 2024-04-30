<template lang="">
  <div
    class="nav"
    @click="closeAllPopups">
    <div class="logo">
      <img
        src="../assets/LOGO.svg"
        alt="" />
      <p class="logo_text">ониторинг</p>
    </div>
    <div class="nav__item">
      <div class="search">
        <transition name="fade">
          <input
            v-if="isSearch"
            type="text"
            class="search_input"
            v-model="searchQuery"
            @input="updateInput" />
        </transition>
        <img
          class="search_ico ico"
          src="../assets/SEARCH.svg"
          @click="showSearch"
          alt="Поиск" />
      </div>
      <div
        class="log_text ico"
        @click="showLog">
        Log
      </div>
      <NavSettings class="NavSettings shadow" />

      <img
        class="printPage ico"
        src="../assets/PRINT.svg"
        alt=""
        @click="this.$store.state.toast.clear" />
    </div>
    <NavSound class="nav__sound shadow" />
    <NavAuth class="shadow" />
  </div>
</template>
<script>
  import NavSettings from './NavSettings.vue'
  import NavSound from './NavSound.vue'
  import NavAuth from './NavAuth.vue'
  import axios from 'axios'
  import Config from '../../config'

  export default {
    data() {
      return {
        isSearch: false,
        searchQuery: '',
        isSettingItems: false
      }
    },
    components: {
      NavSettings,
      NavSound,
      NavAuth
    },
    props: {},
    methods: {
      showSearch() {
        this.isSearch = !this.isSearch
      },
      showSettingItems() {
        this.isSettingItems = !this.isSettingItems
      },
      showLog() {
        if (!this.$store.state.popups.popupLog === true) {
          this.$store.commit('showPopupLog')
          this.getLogs()
        }
      },
      updateInput() {
        this.$emit('input-change', this.searchQuery)
      },
      closeAllPopups(event) {
        if (event.target.className == 'nav' || event.target.className == 'logo_text') {
          this.$store.commit('closeAllPopups', 'reset')
        }
      },
      async getLogs() {
        try {
          const response = await axios.get(`${Config.SERVER_URL}/api/logs/getLogs`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          this.$store.commit('addLogs', response.data)
        } catch (e) {
          console.log(e.message)
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #0e1621;
    padding: 5px 20px;
    font-family: Wix Madefor Display;
    z-index: 3;
    position: relative;
  }

  .nav__sound {
    position: absolute;
    right: 255px;
    top: 13px;
    width: 36px;
  }

  .search_ico,
  .printPage,
  .reset_ico {
    margin-right: 25px;
    width: 20px;
    cursor: pointer;
  }

  .logo {
    display: flex;
    align-items: center;

    img {
      width: 40px;
      height: 40px;
    }
  }

  .logo_text {
    font-size: 20px;
    text-decoration: none;
    color: white;
  }

  .search {
    position: relative;
  }

  .search_input {
    position: absolute;
    width: 182px;
    left: -200px;
    height: 26px;
    border-radius: 10px 10px 0px 10px;
    border: none !important;
    padding-left: 10px;
    font-size: 16px;
    color: #0e1621;

    &:focus {
      outline: none !important;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .search_ico {
    padding-top: 2px;
    width: 18px;
  }

  .nav__item {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: auto;
  }

  .log_text {
    color: white;
    font-size: 20px;
    margin-right: 30px;
    cursor: pointer;
    margin-bottom: 5px;
  }

  .auth {
    display: flex;
    align-items: center;
  }

  .auth_ico {
    width: 30px;
  }

  .auth_text {
    margin-right: 10px;
    color: white;
    text-decoration: none;
    text-transform: uppercase;
  }

  .shadow {
    filter: drop-shadow(0px 10px 5px #00000082);
  }

  @media (max-width: 768px) {
    .nav__item {
      margin-left: 35%;
    }
  }
</style>
