import { Router } from "express"
import { check } from "express-validator"
import SystemController from "../controllers/SystemController.js"
import roleMiddleware from "../middlewares/roleMiddleware.js"

const systemRouter = new Router()

systemRouter.post(
  "/addSystem",
  [
    check(["pin", "number", "correspondent", "subunit"], "Заполните обязательные поля").trim().notEmpty(),
    roleMiddleware(["ADMIN", "SUPERADMIN"]),
  ],
  SystemController.create
)
systemRouter.get("/getSystems", SystemController.getAll)
systemRouter.get("/getSystem/:id", SystemController.getOne)
systemRouter.put("/editSystem", roleMiddleware(["ADMIN", "SUPERADMIN"]), SystemController.update)
systemRouter.put("/editSystemInfo", SystemController.updateInfo)
systemRouter.delete("/removeSystem/:id", roleMiddleware(["ADMIN", "SUPERADMIN"]), SystemController.delete)

export default systemRouter
