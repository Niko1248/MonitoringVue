import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import router from "./routes/index.js"
import Config from "./config/index.js"
import { readPinInfo } from "./routes/ArduinoApi.js"
import { eventsHandler } from "./events/index.js"
const app = express()

app.use(express.json())
app.use(cors())
app.use("/api", router)
app.get("/state", eventsHandler)

async function startApp() {
  try {
    await mongoose.connect(Config.DB_URL)
    app.listen(Config.PORT, () => console.log(`Server started on port ${Config.PORT}`))
  } catch (e) {
    console.log(e)
  }
}

startApp()
setInterval(readPinInfo, 3000)
