import express from "express"
import cors from "cors"
import { createProxyMiddleware } from "http-proxy-middleware"
import mongoose from "mongoose"
import router from "./routers/index.js"
import System from "./schemas/System.js"
const app = express()
const PORT = 80
const DB_URL =
  "mongodb://192.168.0.110:27017,192.168.0.110:27018,192.168.0.110:27019/monitoringDB?replicaSet=rs0&serverSelectionTimeoutMS=5000"

app.use(express.json())
app.use(cors())
app.use("/api", router)

app.use(
  "/readPinInfo",
  createProxyMiddleware({
    target: "http://192.168.0.115",
    changeOrigin: true,
  })
)
const changeStream = System.watch()
changeStream.on("change", (change) => {
  if (change) {
    console.log("Change detected:", change)
  } else {
    console.log("None")
  }

  // Здесь можно отправить обновленные данные на клиент
})
async function startApp() {
  try {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

startApp()
