<template lang="html">
  <div class="SystemP">
    <div class="Sp__wrapper popup">
      <div
        class="close"
        @click="showPopupEditSp">
        <img
          src="./../assets/img/nav/close.svg"
          alt="закрыть"
          width="20px" />
      </div>
      <div class="flex__wrap">
        <div class="form-left">
          <h1>Редактирование системы передачи</h1>
          <div class="main__form">
            <input
              type="text"
              placeholder="№ СП"
              v-model="editSystem.number" />
            <input
              type="text"
              placeholder="Корреспондент"
              v-model="editSystem.correspondent" />
            <input
              type="text"
              placeholder="№ pin"
              v-model="editSystem.pin" />
            <input
              type="text"
              placeholder="КМУ"
              class="input__kmu"
              @click="offInput('KMU')"
              v-model="newKMU.number"
              :disabled="kmuInput" />
            <input
              type="text"
              placeholder="ОМУ"
              tabindex="-1"
              class="input__omu"
              @click="offInput('OMU')"
              v-model="newOMU.number"
              :disabled="omuInput" />

            <select
              v-model="editSystem.subunit"
              v-if="this.$store.state.subunit === 'cskp' || this.$store.state.subunit === 'gcs'">
              <option
                value=""
                disabled
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
              <option value="Питомник">Питомник</option>
              <option value="Отец-одиночка">Отец-одиночка</option>
              <option value="Лулу">Лулу</option>
              <option value="Бобер">Бобер</option>
              <option value="Комар">Комар</option>
              <option value="Васин ёж">Васин ёж</option>
              <option value="40 градусов">40 градусов</option>
              <option value="Зубатый собачник">Зубатый собачник</option>
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
            <p v-if="payloadArr.length == 0">Добавить нагрузку</p>
            <div
              v-else
              v-for="(payload__item, index) in payloadArr"
              :key="'editPayload' + index"
              class="payload__item">
              <img
                :src="viewIco(payload__item.type)"
                alt=""
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
            v-model="editSystem.note"></textarea>
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
              v-model="editSystem.activeTract"
              name=""
              id="">
              <option
                v-for="(item, index) in editSystem.tracts"
                :key="index"
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
              src="../components/ico/edit.svg"
              @click="showEditTract"
              width="20px"
              height="20px"
              style="cursor: pointer"
              alt="edit" />
            <img
              v-if="editSystem.activeTract !== ''"
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
        @click="updateSystem">
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
        payloadArr: [...this.systemData.systemPayload],
        newKMU: { ...this.systemData.systemKMU },
        newOMU: { ...this.systemData.systemOMU },
        editSystem: {
          _id: this.systemData.systemID,
          pin: this.systemData.systemPin.replace(/\D/g, ''),
          number: this.systemData.systemNumber,
          correspondent: this.systemData.systemCorrespondent,
          KMU: this.systemData.systemKMU,
          OMU: this.systemData.systemOMU,
          payload: this.systemData.systemPayload,
          note: this.systemData.systemNote,
          tracts: this.systemData.systemReserve,
          activeTract: this.systemData.systemActiveTract,
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
      showPopupEditSp() {
        this.$store.commit('showPopupEditSp')
      },
      showEditTract() {
        if (!this.$store.state.popups.popupEditTract === true) this.$store.commit('showPopupEditTract')
        document.querySelector('.Sp__wrapper').classList.add('Sp__wrapper--close')
        this.$emit('send-selectTract', this.selectedTract)
      },
      showAddTract() {
        if (!this.$store.state.popups.popupAddTract === true) this.$store.commit('showPopupAddTract')
        document.querySelector('.Sp__wrapper').classList.add('Sp__wrapper--close')
      },
      removePayload(index) {
        this.payloadArr.splice(index, 1)
      },
      addPayload() {
        if (
          this.payload_obj.number.trim() === '' ||
          this.payload_obj.correspondent.trim() === '' ||
          this.payload_obj.type.trim() === ''
        ) {
          this.error = 'Заполните все поля в загрузке'
        } else {
          this.payloadArr.push(this.payload_obj)
          this.payload_obj = {
            number: '',
            correspondent: '',
            type: ''
          }
          this.error = ''
        }
      },
      offInput(inputType) {
        if (inputType == 'KMU') {
          this.omuInput = false
          this.newOMU.number = ''
        } else {
          this.kmuInput = false
          this.newKMU.number = ''
        }
      },
      removeTract() {
        const tractIndex = this.editSystem.tracts.findIndex((tract) => tract.tractName === this.editSystem.activeTract)
        console.log(tractIndex)
        if (tractIndex !== -1) {
          this.editSystem.tracts.splice(tractIndex, 1)
          this.editSystem.activeTract = this.editSystem.tracts.length ? this.editSystem.tracts[0].tractName : ''
        }
      },
      resetForm() {
        ;(this.editSystem = {
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
      },
      async updateSystem() {
        this.error = ''
        this.success = ''
        try {
          this.editSystem.payload = this.payloadArr
          this.editSystem.KMU = this.newKMU
          this.editSystem.OMU = this.newOMU
          console.log(this.editSystem)
          const response = await axios.put(`${Config.SERVER_URL}/api/systems/editSystem`, this.editSystem, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          console.log('далее' + response.data)
          this.$store.commit('updateSystem', response.data)
          this.$store.dispatch('sendLog', {
            type: 'Info',
            message: `СП ${this.editSystem.number} была отредактирована`
          })
          this.resetForm()
          this.showPopupEditSp()
        } catch (e) {
          this.error = e.response.data.message
          console.log(e)
        }
      }
    },
    computed: {
      selectedTract() {
        return this.editSystem.tracts.find((tract) => tract.tractName === this.editSystem.activeTract)
      }
    },
    watch: {
      tractToEditSystem: {
        deep: true, // Глубокое наблюдение за объектами
        handler(newVal) {
          if (newVal) {
            this.editSystem.tracts.push(newVal)
            this.editSystem.activeTract = newVal.tractName
          }
        }
      }
    },
    props: {
      systemData: {
        type: Object,
        default: () => ({})
      },
      tractToEditSystem: {
        type: Object
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
    width: 30%;
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
  .select__tract {
    width: 100%;
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
