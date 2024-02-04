import { createStore } from "vuex"

export default createStore({
  state: {
    soundEnable: false,
    workSorted: false,
    alarmSorted: false,
    popups: {
      popupRegistration: false,
      popupAddSP: false,
      popupSP: false,
    },
    NavPopups: {
      AuthItems: false,
      soundItems: false,
      settingItems: false,
    }
  },
  mutations: {
    /* Звук */
    enableSound(state) {
      state.soundEnable = true
    },
    disableSound(state) {
      state.soundEnable = false
    },


    /* Глобальные попапы */
    showPopupAddSp(state) {
      state.popups.popupAddSP = !state.popups.popupAddSP
    },
    showPopupRegistration(state) {
      state.popups.popupRegistration = !state.popups.popupRegistration;
    },
    showPopupSp(state) {
      state.popups.popupSP = !state.popups.popupSP;
    },

    /* Менюшные попапы */
    showAuthItems(state) {
      state.popups.AuthItems = !state.popups.AuthItems;
    },
    showSoundItems(state) {
      state.popups.soundItems = !state.popups.soundItems;
    },
    showSettingItems(state) {
      state.popups.settingItems = !state.popups.settingItems;
    },

    /* Закрытие всех попапов */
    /*     closeAllPopups(state) {
          Object.keys(state.popups).forEach(key => {
            state.popups[key] = false;
          });
          Object.keys(state.NavPopups).forEach(key => {
            state.NavPopups[key] = false;
          });
        }, */



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
