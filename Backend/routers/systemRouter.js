import { Router } from "express"
import SystemController from "../controllers/SystemController.js"

const systemRouter = new Router()

systemRouter.post("/systems", SystemController.create)
systemRouter.get("/systems", SystemController.getAll)
systemRouter.get("/system/:id", SystemController.getOne)
systemRouter.put("/systems", SystemController.update)
systemRouter.delete("/systems/:id", SystemController.delete)

export default systemRouter
