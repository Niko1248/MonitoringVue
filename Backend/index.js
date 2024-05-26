import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import router from "./routes/index.js"
import Config from "./config/index.js"
import { readPinInfo } from "./routes/ArduinoApi.js"
import { eventsHandler } from "./events/index.js"
import path from "path"
import { fileURLToPath } from "url"

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json())
app.use(cors())
app.use("/api", router)
app.get("/state", eventsHandler)

app.use(express.static(path.join(__dirname, "dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"))
})

async function startApp() {
  try {
    await mongoose.connect(Config.DB_URL)
    app.listen(Config.PORT, () => console.log(`Server started on port ${Config.PORT}`))
  } catch (e) {
    console.log(e)
  }
}

startApp()
setInterval(() => {
  Config.ARDUINO_URL.map((item) => {
    readPinInfo(item)
  })
}, Config.ARDUINO_PULLING_TIME)
