<template lang="html">
  <div class="SystemP">
    <div class="Sp__wrapper popup">
      <div
        class="close"
        @click="showPopupAddSp">
        <img
          src="./../assets/img/nav/close.svg"
          alt="закрыть"
          width="20px" />
      </div>
      <div class="flex__wrap">
        <div class="form-left">
          <h1>Добавление системы передачи</h1>
          <div class="main__form">
            <input
              type="text"
              placeholder="№ СП"
              v-model="newSystem.number" />
            <input
              type="text"
              placeholder="Корреспондент"
              v-model="newSystem.correspondent" />
            <input
              type="text"
              placeholder="№ pin"
              v-model="newSystem.pin" />
            <input
              type="text"
              placeholder="КМУ"
              class="input__kmu"
              @click="offInput('KMU')"
              v-model="newSystem.KMU.number"
              :disabled="kmuInput" />
            <input
              type="text"
              placeholder="ОМУ"
              tabindex="-1"
              class="input__omu"
              @click="offInput('OMU')"
              v-model="newSystem.OMU.number"
              :disabled="omuInput" />

            <select
              v-model="newSystem.subunit"
              v-if="this.$store.state.subunit === 'cskp' || this.$store.state.subunit === 'gcs'">
              <option
                value=""
                disabled
                selected
                hidden>
                Подразделение
              </option>
              <option
                v-for="(subunit, index) in this.$store.state.subunitList.slice(2)"
                :key="index"
                :value="Object.keys(subunit)[0]">
                {{ Object.values(subunit)[0] }}
              </option>
            </select>
          </div>
          <h2>Загрузка системы передачи</h2>
          <div class="payload__form">
            <input
              type="text"
              placeholder="Номер канала"
              v-model="payload_obj.number" />
            <input
              type="text"
              placeholder="Корреспондент"
              v-model="payload_obj.correspondent" />
            <select v-model="payload_obj.type">
              <option
                value=""
                disabled
                selected
                hidden>
                Вид связи
              </option>
              <option
                v-for="(item, index) in configPayloadArr"
                :key="'payload' + index"
                :value="item">
                {{ item }}
              </option>
            </select>
            <img
              src="../assets/plus.svg"
              @click="addPayload"
              width="20px"
              height="20px"
              style="margin-left: 1vw; cursor: pointer"
              alt="" />
          </div>
          <div class="payload__list">
            <p v-if="newSystem.payload.length == 0">Добавить нагрузку</p>
            <div
              v-else
              ref="payload"
              v-for="(payload__item, index) in newSystem.payload"
              :key="'addPayload' + index"
              class="payload__item">
              <img
                :src="viewIco(payload__item.type)"
                class="ico" />
              <div class="payload__text">{{ payload__item.number }} : {{ payload__item.correspondent }}</div>
              <img
                src="../assets/minus.svg"
                class="payload__remove"
                alt="remove"
                :id="'payload' + index"
                @click="removePayload(index)" />
            </div>
          </div>
          <h2>Примечания</h2>
          <textarea
            class="note"
            v-model="newSystem.note"></textarea>
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
        </div>
        <div class="form__right">
          <h2>Линейный тракт</h2>
          <div class="select__tract">
            <select
              v-model="newSystem.selectedNameTract"
              name=""
              id="">
              <option
                v-for="(item, index) in newSystem.tracts"
                :key="'name' + index"
                :value="item.tractName">
                {{ item.tractName }}
              </option>
            </select>
            <img
              src="../assets/plus.svg"
              @click="showAddTract"
              width="20px"
              height="20px"
              style="cursor: pointer"
              alt="add" />
            <img
              v-if="newSystem.selectedNameTract !== ''"
              class="remove__ico"
              src="../components/ico/trash_bin_icon-icons.com_67981.svg"
              @click="removeTract" />
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
      </div>

      <button
        class="save"
        @click="addSystem">
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
        error: '',
        success: '',
        kmuInput: false,
        omuInput: false,
        isRemove: false,
        configPayloadArr: Config.payloadArr,
        newSystem: {
          pin: '',
          number: '',
          correspondent: '',

          KMU: {
            type: 'КМУ',
            number: ''
          },
          OMU: {
            type: 'ОМУ',
            number: ''
          },
          payload: [],
          selectedNameTract: '',
          tracts: [],
          note: '',
          state: 'В работе',
          subunit:
            this.$store.state.subunit === 'cskp' || this.$store.state.subunit === 'gcs'
              ? ''
              : String(this.$store.state.subunit)
        },
        payload_obj: {
          number: '',
          correspondent: '',
          type: ''
        }
      }
    },
    methods: {
      viewIco,
      showPopupAddSp() {
        this.$store.commit('showPopupAddSp')
      },
      showAddTract() {
        if (!this.$store.state.popups.popupAddTract === true) this.$store.commit('showPopupAddTract')
        document.querySelector('.Sp__wrapper').classList.add('Sp__wrapper--close')
      },
      addPayload() {
        if (
          this.payload_obj.number.trim() === '' ||
          this.payload_obj.correspondent.trim() === '' ||
          this.payload_obj.type.trim() === ''
        ) {
          this.error = 'Заполните все поля в загрузке'
        } else {
          this.newSystem.payload.push(this.payload_obj)
          this.payload_obj = {
            number: '',
            correspondent: '',
            type: ''
          }
          this.error = ''
        }
      },
      removePayload(index) {
        this.newSystem.payload.splice(index, 1)
      },
      addObjTract(objTract) {
        this.newSystem.tracts.push(objTract)
      },
      removeTract() {
        const tractIndex = this.newSystem.tracts.findIndex(
          (tract) => tract.tractName === this.newSystem.selectedNameTract
        )
        if (tractIndex !== -1) {
          this.newSystem.tracts.splice(tractIndex, 1)
          this.newSystem.selectedNameTract = this.newSystem.tracts.length ? this.newSystem.tracts[0].tractName : ''
        }
      },
      offInput(inputType) {
        if (inputType == 'KMU') {
          this.omuInput = false
          this.newSystem.OMU.number = ''
        } else {
          this.kmuInput = false
          this.newSystem.KMU.number = ''
        }
      },
      resetForm() {
        ;(this.newSystem = {
          pin: '',
          number: '',
          correspondent: '',
          KMU: {
            type: 'КМУ',
            number: ''
          },
          OMU: {
            type: 'ОМУ',
            number: ''
          },
          payload: [],
          tracts: [],
          selectedNameTract: '',
          note: '',
          state: 'В работе',
          subunit:
            this.$store.state.subunit === 'cskp' || this.$store.state.subunit === 'gcs'
              ? ''
              : String(this.$store.state.subunit)
        }),
          (this.payload_obj = {
            number: '',
            correspondent: '',
            type: ''
          })
        console.log(this.newSystem.tracts)
      },
      async addSystem() {
        this.error = ''
        this.success = ''
        try {
          const response = await axios.post(`${Config.SERVER_URL}/api/systems/addSystem`, this.newSystem, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          this.$store.commit('addSystems', response.data.system)
          this.$store.dispatch('sendLog', {
            type: 'Info',
            message: `СП ${this.newSystem.number} успешно добавлена`
          })
          this.resetForm()
          this.success = response.data.message
        } catch (e) {
          this.error = e.response.data.message
        }
      }
    },
    props: {
      systemData: {
        type: Object,
        default: () => ({})
      },
      objTract: {
        type: Object,
        required: false
      }
    },
    mounted() {
      this.resetForm()
    },
    watch: {
      objTract: {
        handler(obj) {
          if (obj) {
            this.addObjTract(obj)
            this.newSystem.selectedNameTract = obj.tractName
          }
        }
      }
    },
    computed: {
      selectedTract() {
        const tract = this.newSystem.tracts.find((tract) => tract.tractName === this.newSystem.selectedNameTract)
        return tract || null
      }
    }
  }
</script>

<style lang="scss" scoped>
  .SystemP {
    font-family: Wix Madefor Display;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.887);
    backdrop-filter: blur(2px);
    position: fixed;
    left: 0px;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .Sp__wrapper {
    transition: 0.2s;
    padding: 1.1vw 1.5vw 2.3vw;
    width: 80vw;
    max-height: 80vh;
    background-color: #0e1621;
    border-radius: 10px;
    filter: drop-shadow(0px 20px 30px rgba(0, 0, 0, 0.4274509804));
  }
  .flex__wrap {
    display: flex;
    gap: 2vw;
    max-width: 96%;
    height: 96%;
    justify-content: space-between;
    align-items: center;
  }
  .form-left {
    max-width: 63%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .form__right {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 1vw;
    width: 32%;
  }
  h1,
  h2 {
    color: white;
    margin-bottom: 1vw;
  }
  .main__form {
    display: grid;
    grid-template-columns: 20% 25% 12% 9% 9% 25%;
    margin: 0 0 1vw 0;
  }
  .payload__form {
    display: grid;
    grid-template-columns: 30% 30% 30% 10%;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 1vw 0;
  }
  .payload__item {
    display: flex;
    color: white;
    align-items: center;
  }
  .payload__list,
  .note {
    background-color: #2e3541;
    border-radius: 5px;
    border: 0;
    color: rgb(217, 217, 217, 17%);
    padding: 0.7vw;
    font-size: 18px;
    margin-bottom: 1vw;
    overflow: auto;
  }
  .payload__remove {
    margin-left: auto;
    cursor: pointer;
    width: 15px;
    height: 15px;
  }
  .note {
    height: 15%;
    color: white;
  }
  input {
    background-color: #2e3541;
    border-radius: 5px;
    border: 0;
    color: white;
    font-size: 16px;
    padding: 0.7vw;
    margin-right: 1vw;
    &::placeholder {
      color: rgb(217, 217, 217, 17%);
      text-align: left;
      font-size: 18px;
      font-weight: 400;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  .input__kmu {
    margin-right: 0;
    padding: 0.6vw 0 0.6vw 0.6vw;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .input__omu {
    padding: 0.6vw 0.6vw 0.6vw 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .select__tract {
    width: 90%;
  }
  .ico {
    width: 20px;
    height: 20px;
    margin-right: 5px;
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
    max-height: 70%;
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
  .error {
    color: red;
  }
  .success {
    color: green;
  }
  select {
    border: none;
    cursor: pointer;
    border-radius: 5px;
    outline: none;
    background: #2e3541;
    color: #f2f1f1;
    padding: 0.65vw;
    font-size: 18px;
    transition: 0.2s ease-in;
    margin-right: 1vw;
    width: 100%;
    &:hover {
      filter: drop-shadow(0px 0px 2px #ffffff40);
      transition: 0.2s;
    }

    &:focus {
      filter: drop-shadow(0px 0px 2px #000);
      transition: 0.2s ease-in;
    }
  }
  .Sp__wrapper--close {
    opacity: 0.6;
    transition: 0.2s ease;
    filter: drop-shadow(0px 0px 20px #000);
    transform: scale(0.7) translate(-20vw, 10vw);
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
  .remove__ico {
    width: 1.5vw;
    margin-left: 15px;
    transition: 0.2s;
    cursor: pointer;
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
</style>
