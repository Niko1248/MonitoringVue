import express from "express"
import cors from "cors"
import { createProxyMiddleware } from "http-proxy-middleware"
import mongoose from "mongoose"
import router from "./routers/index.js"

const app = express()
const PORT = 80
const DB_URL = `mongodb://192.168.0.108:27017/monitoringDB?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1`

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

async function startApp() {
  try {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

startApp()
