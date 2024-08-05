import { Router } from "express"
import LogsController from "../controllers/LogsController.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import roleMiddleware from "../middlewares/roleMiddleware.js"

const logsRouter = new Router()

logsRouter.post("/addLog", authMiddleware, LogsController.create)
logsRouter.post("/addSystemStatus", authMiddleware, LogsController.createSystemStatus)
logsRouter.get("/getLogs", LogsController.getAll)
logsRouter.delete("/deleteLogs", roleMiddleware(["ADMIN"]), LogsController.deleteLogs)
export default logsRouter
