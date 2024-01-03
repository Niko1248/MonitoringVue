import { createStore } from "vuex"

export default createStore({
  state: {
    soundEnable: false,
  },
  mutations: {
    enableSound(state) {
      state.soundEnable = true
    },
    disableSound(state) {
      state.soundEnable = false
    },
  },
})
