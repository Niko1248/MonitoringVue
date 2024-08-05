<template lang="html">
  <div class="SystemP">
    <div class="Sp__wrapper popup">
      <div
        class="close"
        @click="showPopupSP">
        <img
          src="./../assets/img/nav/close.svg"
          alt="закрыть"
          width="20px" />
      </div>
      <div class="Sp__wrapper-header">
        <h1 class="systemNumber">{{ systemData.systemNumber }}</h1>
        <h1 class="systemCorrespondent">{{ systemData.systemSubunit }} - {{ systemData.systemCorrespondent }}</h1>
        <p
          class="systemState"
          :style="{
            backgroundColor:
              systemData.systemState == 'В работе'
                ? '#278547'
                : systemData.systemState == 'Авария'
                ? '#7E1313'
                : '#535353'
          }">
          {{ systemData.systemState }}
        </p>
        <div class="remove_wrapper">
          <img
            class="remove__ico"
            src="../components/ico/trash_bin_icon-icons.com_67981.svg"
            @click="showRemoveSp" />
          <transition name="fade">
            <div v-if="isRemove">
              <p style="cursor: default">Удалить систему передачи?</p>
              <p
                @click="removeSystem"
                style="cursor: pointer">
                Да
              </p>
              <p
                @click="showRemoveSp"
                style="cursor: pointer">
                Нет
              </p>
            </div>
          </transition>
        </div>
        <div class="remove_wrapper">
          <img
            class="edit__ico"
            src="../components/ico/edit.svg"
            @click="changePopup" />
        </div>
      </div>
      <div class="Sp__wrapper-content">
        <div class="Sp__content">
          <div
            v-for="(payload, index) in systemData.systemPayload"
            :key="index"
            class="Sp__content-items">
            <div class="item__wrapper">
              <img
                v-if="payload.type"
                :title="payload.type"
                :src="viewIco(payload.type)"
                alt=""
                class="ico" />
              <div class="payload__text">{{ payload.number }} : {{ payload.correspondent }}</div>
            </div>
          </div>
        </div>
        <div class="Sp__note">
          <textarea
            cols="30"
            rows="10"
            placeholder="Примечания"
            v-model="systemInfo.note">
          </textarea>
        </div>
        <div class="select__tract">
          <select
            v-model="systemInfo.activeTract"
            name=""
            @change="test"
            id="">
            <option
              v-for="(item, index) in systemInfo.tracts"
              :key="index"
              :value="item.tractName">
              {{ item.tractName }}
            </option>
          </select>
          <div
            class="tract__wrapper"
            v-if="selectedTract">
            <div class="node">
              {{ selectedTract.startNode }}
            </div>
            <div
              class="tract__item"
              v-for="(item, index) in selectedTract.tractData"
              :key="index">
              <div class="line">
                <div class="line__name">{{ item.line }}</div>
                <div class="line__middle"></div>
                <div class="line__section">{{ item.section }}</div>
              </div>
              <div class="node">{{ item.node }}</div>
            </div>
          </div>
        </div>
      </div>
      <p
        class="error"
        v-if="error">
        {{ error }}
      </p>
      <p
        class="success"
        v-if="success">
        {{ success }}
      </p>
      <button
        class="save"
        @click="editSystemInfo">
        Сохранить
      </button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Config from '../../config'
  import viewIco from '../utils/viewIco.js'
  export default {
    data() {
      return {
        isRemove: false,
        systemInfo: {
          note: this.systemData.systemNote,
          tracts: this.systemData.systemReserve,
          activeTract: this.systemData.systemActiveTract,
          _id: this.systemData.systemID
        },
        error: '',
        success: ''
      }
    },
    methods: {
      viewIco,
      changePopup() {
        this.showPopupSP()
        this.showPopupEditSP()
      },
      showPopupSP() {
        this.$store.commit('showPopupSp')
      },
      showPopupEditSP() {
        this.$store.commit('showPopupEditSp')
      },
      showRemoveSp() {
        this.isRemove = !this.isRemove
      },
      async editSystemInfo() {
        this.error = ''
        this.success = ''
        try {
          const response = await axios.put(`${Config.SERVER_URL}/api/systems/editSystemInfo`, this.systemInfo, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })

          this.$store.commit('updateSystemInfo', {
            _id: response.data._id,
            note: response.data.note,
            activeTract: response.data.selectedNameTract
          })
          this.$store.dispatch('sendLog', {
            type: 'Info',
            message: `СП ${this.systemData.systemNumber}. Примечание: ${response.data.note}. Активная трасса: ${response.data.selectedNameTract}`
          })
          this.success = 'Изменения приняты'
        } catch (e) {
          this.error = 'Ошибка'
        }
      },
      async removeSystem() {
        try {
          await axios.delete(`${Config.SERVER_URL}/api/systems/removeSystem/${this.systemData.systemID}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          const newSystems = this.$store.state.systems.filter((el) => el._id !== this.systemData.systemID)
          this.$store.commit('removeSystems', newSystems)
          this.$store.dispatch('sendLog', {
            type: 'Info',
            message: `СП ${this.systemData.systemNumber} удалена`
          })
          this.showPopupSP()
        } catch (e) {
          console.log(e)
        }
      }
    },
    computed: {
      selectedTract() {
        return this.systemInfo.tracts.find((tract) => tract.tractName === this.systemInfo.activeTract)
      }
    },
    mounted() {
      if (!this.selectedTract) {
        this.systemInfo.activeTract = this.systemInfo.tracts.length ? this.systemInfo.tracts[0].tractName : ''
      }
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
    padding: 1.1vw 1.5vw 2.6vw;
    width: 80vw;
    max-height: 80vh;
    background-color: #0e1621;
    border-radius: 10px;
    filter: drop-shadow(0px 20px 30px rgba(0, 0, 0, 0.4274509804));
  }
  .ico {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  .Sp__content-items {
    margin-bottom: 5px;
  }
  .payload__text {
    color: #dbffda;
  }
  .close {
    height: 100%;
    width: 25px;
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
      content: '';
      display: block;
      position: absolute;
      width: 13px;
      height: 13px;
      left: -13px;
      bottom: 0px;
      background-image: url(./../assets/img/nav/left-down.svg);
    }

    &::after {
      content: '';
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

  .Sp__wrapper-content {
    display: flex;
    gap: 1vw;
  }
  .item__wrapper {
    display: flex;
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

  .save {
    background: #053429;
    outline: none;
    color: #f2f1f1;
    position: absolute;
    bottom: 0;
    left: calc((100% - 130px) / 2);
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
      content: '';
      display: block;
      position: absolute;
      width: 13px;
      height: 13px;
      left: -13px;
      bottom: 0px;
      background-image: url(./../assets/img/nav/left-down.svg);
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 13px;
      height: 13px;
      right: -13px;
      bottom: 0px;
      background-image: url(./../assets/img/nav/right-down.svg);
    }
  }

  textarea {
    background: #2e3541;
    border: none;
    min-width: calc(100% - 20px);
    max-width: calc(100% - 20px);
    border-radius: 5px;
    max-height: 47%;
    outline: none;
    color: #f2f1f1;
    padding: 10px;
    font-size: 18px;

    &::placeholder {
      padding: 0px 10px;
      font-size: 18px;
      color: #f2f1f1;
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

  select {
    width: calc(86% + 40px);
    height: 45px;
    border: none;
    border-radius: 5px;
    outline: none;
    background: #2e3541;
    color: #f2f1f1;
    padding: 4px 0px 6px 20px;
    font-size: 18px;
    color: #f2f1f1;
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

  .Sp__content {
    width: 30%;
    background: #2e3541;
    border-radius: 5px;
  }

  .Sp__tract {
    width: 30%;
  }

  .Sp__note {
    width: 35%;
  }

  .remove_wrapper {
    display: flex;

    div {
      margin-top: 5px;
      display: flex;
      margin-left: 1vw;
      background: #b70000;
      border-radius: 7px;
      padding: 0 0 0 0.7vw;
    }

    p:nth-child(2) {
      margin-bottom: 0.1vw;
      display: block;
      padding: 0.1vw 0vw 0.1vw 0vw;
      height: 90%;
      width: 3vw;
      margin-left: 1vw;
      border-radius: 7px 0px 0px 7px;
      text-align: center;
      transition: 0.1s;

      &:hover {
        background: #0000009b;
        transition: 0.1s;
      }
    }

    p:nth-child(3) {
      display: block;
      padding: 0.1vw 0vw;
      height: 90%;
      width: 3vw;
      border-radius: 0px 7px 7px 0px;
      text-align: center;
      margin-bottom: 0.1vw;
      transition: 0.1s;

      &:hover {
        transition: 0.1s;
        background: #0000009b;
      }
    }
  }

  .remove__ico,
  .edit__ico {
    width: 1.5vw;
    margin-left: 2vw;
    transition: 0.2s;

    &:hover {
      filter: drop-shadow(0 0 10px #fff);
      stroke: #fff;
      transition: 0.2s;
    }

    &:active {
      filter: drop-shadow(0 0 10px #000);
      stroke: #fff;
      transition: 0.2s;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: 1.5s ease;
    opacity: 1;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transition: 1.5s ease;
  }
  .error {
    color: red;
  }
  .success {
    color: green;
  }
  .tract__wrapper {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }

  .tract__item {
    display: flex;
    align-items: center;
  }
  .node {
    border-radius: 50%;
    position: relative;
    width: 50px;
    height: 50px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .line {
    display: flex;
    flex-direction: column;
  }
  .line__name,
  .line__section {
    display: flex;
    justify-content: center;
    color: #fff;
  }
  .line__middle {
    width: 50px;
    height: 1px;
    margin: 2px 0px 3px;
    background: #fff;
  }
</style>
