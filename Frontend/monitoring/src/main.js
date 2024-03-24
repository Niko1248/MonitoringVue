import { createApp } from "vue"
import App from "./App.vue"
import store from "./store/index.js"
import router from "./router/router.js"
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import "./assets/styles.scss"

const app = createApp(App)

const options = {
  position: "bottom-right",
  transition: "Vue-Toastification__fade",
  timeout: false,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
}

app.use(router).use(store).use(Toast, options).mount("#app")
