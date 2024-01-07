import { Router } from "express"
import LogsController from "../controllers/LogsController.js"

const logsRouter = new Router()

logsRouter.post("/addLog", LogsController.create)
logsRouter.get("/getLogs", LogsController.getAll)
export default logsRouter
