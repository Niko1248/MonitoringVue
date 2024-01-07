import { Router } from "express"
import SystemController from "../controllers/SystemController.js"

const systemRouter = new Router()

systemRouter.post("/addSystem", SystemController.create)
systemRouter.get("/getSystems", SystemController.getAll)
systemRouter.get("/getSystem/:id", SystemController.getOne)
systemRouter.put("/editSystem", SystemController.update)
systemRouter.delete("/removeSystem/:id", SystemController.delete)

export default systemRouter
