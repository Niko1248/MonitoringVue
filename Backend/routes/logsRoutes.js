import { Router } from "express"
import LogsController from "../controllers/LogsController.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const logsRouter = new Router()

logsRouter.post("/addLog", authMiddleware, LogsController.create)
logsRouter.get("/getLogs", LogsController.getAll)
export default logsRouter
