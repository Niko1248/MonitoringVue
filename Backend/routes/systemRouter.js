import { Router } from "express"
import SystemController from "../controllers/SystemController.js"
import roleMiddleware from "../middlewares/roleMiddleware.js"

const systemRouter = new Router()

systemRouter.post("/addSystem", roleMiddleware(["ADMIN"]), SystemController.create)
systemRouter.get("/getSystems", SystemController.getAll)
systemRouter.get("/getSystem/:id", SystemController.getOne)
systemRouter.put("/editSystem", roleMiddleware(["ADMIN"]), SystemController.update)
systemRouter.delete("/removeSystem/:id", roleMiddleware(["ADMIN"]), SystemController.delete)

export default systemRouter
