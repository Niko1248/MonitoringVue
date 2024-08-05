<template lang="html">
  <div class="log">
    <div class="log popup">
      <img
        src="./../assets/img/nav/close.svg"
        alt="закрыть"
        width="20px"
        class="close"
        @click="showPopupLog" />
      <div class="log__flexWrap">
        <div class="flex-left">
          <ol class="log__list">
            <li
              v-for="(item, index) in filteredLogs"
              :key="'else' + index"
              class="log__item">
              <input
                v-if="typeReset"
                type="checkbox"
                @click="selectLog(item)"
                :style="{ marginRight: '5px' }" />
              <div class="log__time">{{ item.createdAt }}</div>
              <div class="log__subunit">{{ item.subunit }}</div>
              <div class="log__username">{{ ' (' + item.username + ')  :' }}</div>
              <div class="log__message">{{ item.message }}</div>
            </li>
          </ol>
        </div>
        <div class="flex-right">
          <form
            class=""
            action="">
            <input
              type="text"
              class="type__input"
              placeholder="Введите ключевое слово"
              v-model="searchQuery" />

            <input
              type="date"
              class="type__input date-input"
              v-model="startDate"
              placeholder="Введите начальную дату" />

            <input
              type="date"
              class="type__input date-input"
              v-model="endDate"
              placeholder="Введите конечную дату" />
          </form>
          <div
            class="log__btn"
            @click="resetFilters">
            Сбросить фильтры
          </div>

          <!-- Удаление лога только для админа -->
          <div
            class="log__btn"
            v-if="this.$store.state.roles === 'ADMIN'"
            @click="toggleResetLogPopup">
            Удалить лог
          </div>
          <div class="checkbox-wrapper-35">
            <input
              value="private"
              name="switch"
              id="switch"
              type="checkbox"
              class="switch"
              v-model="typeReset"
              @click="sendData.selectLogArr = []" />
            <label for="switch">
              <span class="switch-x-text">Удаление лога: </span>
              <span class="switch-x-toggletext">
                <span class="switch-x-unchecked"><span class="switch-x-hiddenlabel">Unchecked: </span>Полное</span>
                <span class="switch-x-checked"><span class="switch-x-hiddenlabel">Checked: </span>Выборочное</span>
              </span>
            </label>
          </div>
          <p
            class="success"
            v-if="success">
            {{ success }}
          </p>
          <p
            class="error"
            v-if="error">
            {{ error }}
          </p>
        </div>
      </div>

      <div class="log__instrument">
        <div class="log__time-filter">
          <label
            v-for="item in timeFilterValue"
            :key="'filter-item-' + item"
            class="filter__item">
            <input
              type="radio"
              name="timeFilter"
              :value="item"
              v-model="selectFilter"
              @change="sortedTime" />
            {{ item }}
          </label>
        </div>
      </div>
    </div>
    <div
      class="reset__popup"
      v-if="resetLog__popup">
      <div class="popup__wrapper">
        <img
          src="./../assets/img/nav/close.svg"
          alt="закрыть"
          width="20px"
          class="close"
          @click="toggleResetLogPopup" />
        <p>Для удаления лог фаила введите пароль администратора.</p>
        <input
          type="password"
          class="type__input"
          v-model="sendData.password" />

        <div
          class="log__btn"
          @click="deleteLogs">
          Удалить лог
        </div>
        <p
          class="error"
          v-if="errorPopup">
          {{ errorPopup }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { parse, subMinutes, subHours, subDays, subWeeks, subMonths, isWithinInterval } from 'date-fns'
  import Config from '../../config'

  const parseFormat = 'dd.MM.yyyy HH:mm:ss'

  export default {
    data() {
      return {
        timeFilterValue: [
          '5 мин',
          '10 мин',
          '30 мин',
          '1 час',
          '6 часов',
          '12 часов',
          '24 часа',
          'Неделя',
          'Месяц',
          'Всё'
        ],
        logs: this.$store.state.dataLogs,
        startDate: '',
        endDate: '',
        selectFilter: '',
        searchQuery: '',
        resetLog__popup: false,
        sendData: {
          username: this.$store.state.username,
          password: '',
          selectLogArr: []
        },
        typeReset: false,
        errorPopup: '',
        error: '',
        success: ''
      }
    },
    components: {},
    methods: {
      toggleResetLogPopup() {
        if (this.typeReset && this.sendData.selectLogArr.length === 0) {
          this.error = 'Нет выбранных записей'
          return
        }
        if (!this.resetLog__popup) {
          this.error = ''
        }
        this.resetLog__popup = !this.resetLog__popup
      },
      showPopupLog() {
        this.$store.commit('showPopupLog')
      },
      updateTimeFilterArray(newLogs) {
        if (this.selectFilter) {
          this.sortedTime({ target: { innerText: this.selectFilter } })
        } else {
          this.logs = newLogs
        }
      },
      selectLog(value) {
        let index = this.sendData.selectLogArr.findIndex((el) => el === value._id)
        if (index === -1) {
          this.sendData.selectLogArr.push(value._id)
        } else {
          this.sendData.selectLogArr.splice(index, 1)
        }
      },
      sortedTime() {
        let nowDate = new Date()
        let timeInterval
        // Выставляет правильные интервалы, при выборе их в фильтрах
        switch (this.selectFilter) {
          case '5 мин':
            timeInterval = subMinutes(nowDate, 5)
            break
          case '10 мин':
            timeInterval = subMinutes(nowDate, 10)
            break
          case '30 мин':
            timeInterval = subMinutes(nowDate, 30)
            break
          case '1 час':
            timeInterval = subHours(nowDate, 1)
            break
          case '6 часов':
            timeInterval = subHours(nowDate, 6)
            break
          case '12 часов':
            timeInterval = subHours(nowDate, 12)
            break
          case '24 часа':
            timeInterval = subDays(nowDate, 1)
            break
          case 'Неделя':
            timeInterval = subWeeks(nowDate, 1)
            break
          case 'Месяц':
            timeInterval = subMonths(nowDate, 1)
            break
          case 'Всё':
            this.logs = []
            this.logs = this.$store.state.dataLogs
            return
        }
        //Если выбран интервал времени, то запускается функция фильтр
        if (timeInterval) {
          this.filterTime(timeInterval, nowDate)
        }
      },
      filterTime(value, nowDate) {
        this.logs = []
        // Из стора вытягиваем логи
        this.$store.state.dataLogs.filter((time) => {
          //Преобразует время из логов(time.createdAt), к правильному формату в соответствии с parseFormat..конкретнее смотри библиотеку date-fns
          const date = parse(time.createdAt, parseFormat, new Date())
          // Здесь выдергивает эту запись, если она попала в интервал
          let formatDate = isWithinInterval(date, {
            start: value,
            end: nowDate
          })
          //Если такая есть, то добавляет в массив который отображается на экране
          if (formatDate) {
            this.logs.push(time)
          }
        })
      },
      resetFilters() {
        this.searchQuery = ''
        this.startDate = ''
        this.endDate = ''
        this.selectFilter = ''
      },
      async deleteLogs() {
        this.errorPopup = ''
        this.success = ''
        // Если активно выборочное удаление лога
        if (this.typeReset) {
          try {
            const response = await axios.delete(`${Config.SERVER_URL}/api/logs/deleteSelectLog`, {
              data: this.sendData,
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            })
            this.$store.commit('deleteSelectLog', this.sendData.selectLogArr)
            this.success = response.data
            this.sendData.selectLogArr = []
            this.sendData.password = ''
            this.resetLog__popup = false
            this.typeReset = false
          } catch (e) {
            this.errorPopup = e.response.data
            console.log(e)
          }
        } else {
          //Если активно полное удаление лога
          try {
            const response = await axios.delete(`${Config.SERVER_URL}/api/logs/deleteLogs`, {
              data: this.sendData,
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            })
            this.$store.state.dataLogs = []
            this.success = response.data
            this.sendData.password = ''
            this.resetLog__popup = false
          } catch (e) {
            this.errorPopup = e.response.data
            console.log(e)
          }
        }
      }
    },
    computed: {
      filteredLogs() {
        //Проверяем, введена ли в инпут начальная и конечная дата для фильтрации и преобразуем к формату даты
        const start = this.startDate ? new Date(this.startDate).setHours(0, 0, 0, 0) : null
        const end = this.endDate ? new Date(this.endDate).setHours(23, 59, 59, 999) : null

        return (
          this.logs
            .filter((log) => {
              //Преобразует время из логов(time.createdAt), к правильному формату в соответствии с parseFormat..конкретнее смотри библиотеку date-fns
              const logDate = parse(log.createdAt, parseFormat, new Date())
              // Ищет введенное ключевой слово в логах
              const matchesSearchQuery = log.message.toLowerCase().includes(this.searchQuery.toLowerCase())
              // Ищет записи которые попали во временной интервал
              // Логика записи:
              // 1. Если начальная дата не установлена, проверить только конечную дату.
              // 2. Если конечная дата не установлена, проверить только начальную дату.
              // 3. Если обе даты установлены, проверить, что дата лога находится в указанном диапазоне.
              const withinDateRange = (!start || logDate >= start) && (!end || logDate <= end)
              // Возвращает данные которые попали
              return matchesSearchQuery && withinDateRange
            })
            //Инвертирует логи, чтобы свежие были сверху
            .sort((a, b) => parse(b.createdAt, parseFormat, new Date()) - parse(a.createdAt, parseFormat, new Date()))
        )
      }
    },
    watch: {
      //Отслеживает изменения в логах которые лежат в сторе, туда сразу пишутся элементы при их добавлении в БД
      '$store.state.dataLogs': {
        handler(newLogs) {
          this.updateTimeFilterArray(newLogs)
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  * {
    color: white;
  }
  .log {
    position: relative;
    display: flex;
    font-family: Wix Madefor Display;
    flex-direction: column;
    bottom: 0;
    width: 100%;
    justify-content: space-between;
    height: 53vh;
    background: rgba(14, 22, 33, 0.2941176471);
    backdrop-filter: blur(3px);
    border-radius: 10px 10px 0px 0px;
    z-index: 999;
    filter: drop-shadow(-15px -10px 10px rgba(0, 0, 0, 0.6235294118));
  }
  .close {
    position: absolute;
    right: 0.6vw;
    top: 0.6vw;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      filter: drop-shadow(0px 0px 2px #fff);
      transition: 0.2s;
    }
  }

  .log__list {
    padding: 0px 30px;
    height: 100%;
    margin-top: 20px;
    overflow-x: hidden;
  }

  .log__item {
    display: flex;
    div {
      color: #bdbdbd;
    }
  }

  .log__username {
    margin-right: 10px;
  }
  .log__time-filter {
    display: flex;
    padding: 20px 0 10px 30px;
    justify-content: space-between;
    align-items: center;
    height: 10%;
    max-width: 65%;
  }
  .filter__item {
    cursor: pointer;
  }

  .log__time {
    color: #8bdfb2 !important;
    margin-right: 20px;
  }
  .log__subunit {
    margin-right: 5px;
    color: #d5df8b !important;
  }
  .log__username {
    color: rgb(19, 148, 116) !important;
  }
  .log__flexWrap {
    display: flex;
    height: 78%;
    gap: 40px;
  }
  .flex-left {
    width: 70%;
    height: 100%;
    margin-top: 10px;
  }
  .flex-right {
    display: flex;
    flex-direction: column;
    width: 30%;
    height: 100%;
  }
  .type__input {
    background-color: #2e3541;
    border-radius: 5px;
    border: 0;
    width: 75%;
    color: white;
    font-size: 16px;
    padding: 0.7vw;
    margin-top: 1vw;
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
  form {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }
  .log__btn {
    background-color: #2e3541;
    text-align: center;
    border-radius: 5px;
    border: 1px solid white;
    cursor: pointer;
    width: 75%;
    color: white;
    font-size: 16px;
    padding: 0.7vw;
    margin-top: 15px;
    z-index: 2;
  }
  .reset__popup {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(14, 22, 33, 0.2941176471);
    backdrop-filter: blur(3px);
    border-radius: 10px 10px 0px 0px;
  }
  .popup__wrapper {
    position: relative;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 45%;
    background-color: #2e3541;
    border: #fff 2px solid;
    border-radius: 10px;
  }
  .popup__wrapper .type__input {
    border-radius: 5px;
    border: 1px solid white;
  }

  .error {
    color: red;
    margin-top: 1vw;
  }
  .success {
    color: green;
    margin-top: 1vw;
  }
  /* From Uiverse.io by Bodyhc */
  .checkbox-wrapper-35 .switch {
    display: none;
  }

  .checkbox-wrapper-35 .switch + label {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    color: #78768d;
    cursor: pointer;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 12px;
    line-height: 15px;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-top: 20px;
  }

  .checkbox-wrapper-35 .switch + label::before,
  .checkbox-wrapper-35 .switch + label::after {
    content: '';
    display: block;
  }

  .checkbox-wrapper-35 .switch + label::before {
    background-color: #05012c;
    border-radius: 500px;
    height: 17px;
    margin-right: 8px;
    -webkit-transition: background-color 0.125s ease-out;
    transition: background-color 0.125s ease-out;
    width: 35px;
    border: 1px solid white;
  }

  .checkbox-wrapper-35 .switch + label::after {
    background-color: #fff;
    border-radius: 13px;
    box-shadow: 0 3px 1px 0 rgba(37, 34, 71, 0.05), 0 2px 2px 0 rgba(37, 34, 71, 0.1),
      0 3px 3px 0 rgba(37, 34, 71, 0.05);
    height: 16px;
    left: 1px;
    position: absolute;
    top: 1px;
    -webkit-transition: -webkit-transform 0.125s ease-out;
    transition: -webkit-transform 0.125s ease-out;
    transition: transform 0.125s ease-out;
    transition: transform 0.125s ease-out, -webkit-transform 0.125s ease-out;
    width: 16px;
  }

  .checkbox-wrapper-35 .switch + label .switch-x-text {
    display: block;
    margin-right: 7px;
  }

  .checkbox-wrapper-35 .switch + label .switch-x-toggletext {
    display: block;
    font-weight: bold;
    height: 15px;
    position: relative;
    width: auto;
  }

  .checkbox-wrapper-35 .switch + label .switch-x-unchecked,
  .checkbox-wrapper-35 .switch + label .switch-x-checked {
    left: 0;
    position: absolute;
    top: 0;
    -webkit-transition: opacity 0.125s ease-out, -webkit-transform 0.125s ease-out;
    transition: opacity 0.125s ease-out, -webkit-transform 0.125s ease-out;
    transition: transform 0.125s ease-out, opacity 0.125s ease-out;
    transition: transform 0.125s ease-out, opacity 0.125s ease-out, -webkit-transform 0.125s ease-out;
  }

  .checkbox-wrapper-35 .switch + label .switch-x-unchecked {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }

  .checkbox-wrapper-35 .switch + label .switch-x-checked {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }

  .checkbox-wrapper-35 .switch + label .switch-x-hiddenlabel {
    position: absolute;
    visibility: hidden;
  }

  .checkbox-wrapper-35 .switch:checked + label::before {
    background-color: #34c759;
  }

  .checkbox-wrapper-35 .switch:checked + label::after {
    -webkit-transform: translate3d(20px, 0, 0);
    transform: translate3d(20px, 0, 0);
  }

  .checkbox-wrapper-35 .switch:checked + label .switch-x-unchecked {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }

  .checkbox-wrapper-35 .switch:checked + label .switch-x-checked {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
</style>
