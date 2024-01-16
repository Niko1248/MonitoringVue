import { createStore } from "vuex"

export default createStore({
  state: {
    soundEnable: false,
    workSorted: false,
    alarmSorted: false,
    popups: {
      popupRegistration: false,
      popupAddSP: false,
    }
  },
  mutations: {
    enableSound(state) {
      state.soundEnable = true
    },
    showPopupAddSp(state) {
      state.popups.popupAddSP = !state.popups.popupAddSP
    },
    showPopupRegistration(state) {
      state.popups.popupRegistration = !state.popups.popupRegistration;
    },
    disableSound(state) {
      state.soundEnable = false
    },
    disableWorkSorted(state, value) {
      state.workSorted = value
      if (value) {
        state.alarmSorted = false
      }
    },
    disableAlarmSorted(state, value) {
      state.alarmSorted = value
      if (value) {
        state.workSorted = false
      }
    },
  },
  getters: {
    isAnyPopupOpen: state => {
      return Object.values(state.popups).some(value => value === true);
    }
  }
})
