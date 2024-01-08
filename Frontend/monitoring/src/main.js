import { createApp } from "vue"
import App from "./App.vue"
import store from "./store/index.js"
import router from "./router/router.js"
import "./assets/styles.scss"

const app = createApp(App)

app.use(router).use(store).mount("#app")
