import { Router } from "express"
import systemRouter from "./systemRouter.js"
import logsRouter from "./logsRoutes.js"
import authRouter from "./authRouter.js"
import Config from "../config/index.js"
import { arduinoList } from "./ArduinoApi.js"

const router = new Router()

router.use("/systems", systemRouter)
router.use("/logs", logsRouter)
router.use("/auth", authRouter)

router.get("/getSubunitList", (req, res) => {
  res.json(Config.subunitList)
})
router.get("/getArduinoStateList", (req, res) => {
  res.json(arduinoList)
})

export default router
