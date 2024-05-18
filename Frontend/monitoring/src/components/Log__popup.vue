<template lang="html">
  <div class="log">
    <div class="log popup">
      <img
        src="./../assets/img/nav/close.svg"
        alt="закрыть"
        width="20px"
        class="close"
        @click="showPopupLog" />
      <ol class="log__list">
        <li
          v-for="({ type, subunit, username, message, createdAt }, index) in timeFilterArray"
          :key="'else' + index"
          class="log__item">
          <div class="log__time">{{ createdAt }}</div>
          <div class="log__subunit">{{ subunit }}</div>
          <div class="log__username">{{ '/ ' + username + '  :' }}</div>
          <div class="log__message">{{ message }}</div>
        </li>
      </ol>

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
</template>

<script>
  import { parse, subMinutes, subHours, subDays, subWeeks, subMonths, isWithinInterval } from 'date-fns'

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
        timeFilterArray: this.$store.state.dataLogs,
        selectFilter: ''
      }
    },
    components: {},
    methods: {
      showPopupLog() {
        this.$store.commit('showPopupLog')
      },
      updateTimeFilterArray(logs) {
        if (this.selectFilter) {
          this.sortedTime({ target: { innerText: this.selectFilter } })
        } else {
          this.timeFilterArray = logs
        }
      },
      sortedTime() {
        let nowDate = new Date()
        let timeInterval
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
            this.timeFilterArray = []
            this.timeFilterArray = this.$store.state.dataLogs
            return
        }
        if (timeInterval) {
          this.filterTime(timeInterval, nowDate)
        }
      },
      filterTime(value, nowDate) {
        this.timeFilterArray = []
        this.$store.state.dataLogs.filter((time) => {
          const date = parse(time.createdAt, parseFormat, new Date())
          let formatDate = isWithinInterval(date, {
            start: value,
            end: nowDate
          })
          if (formatDate) {
            this.timeFilterArray.push(time)
          }
        })
      }
    },
    watch: {
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
    padding: 30px;
    max-height: 65%;
    overflow-x: hidden;
    max-width: 65%;
  }

  .log__item {
    display: flex;
    div {
      font-family: 'Roboto';
      color: #9e9e9e;
    }
  }
  .log__time,
  .log__subunit {
    margin-right: 5px;
  }
  .log__username {
    margin-right: 15px;
  }
  .log__time-filter {
    display: flex;
    padding: 20px 0 20px 30px;
    justify-content: space-between;
    align-items: center;
    height: 10%;
    max-width: 65%;
  }
  .filter__item {
    cursor: pointer;
  }
</style>
