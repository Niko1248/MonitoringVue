import { Router } from "express"
import { check } from "express-validator"
import SystemController from "../controllers/SystemController.js"

const systemRouter = new Router()

systemRouter.post(
  "/addSystem",
  [check(["pin", "number", "correspondent", "subunit"], "Заполните обязательные поля").trim().notEmpty()],
  SystemController.create
)
systemRouter.get("/getSystems", SystemController.getAll)
systemRouter.get("/getSystem/:id", SystemController.getOne)
systemRouter.put(
  "/editSystem",
  [check(["pin", "number", "correspondent", "subunit"], "Заполните обязательные поля").trim().notEmpty()],
  SystemController.update
)
systemRouter.put("/editSystemInfo", SystemController.updateInfo)
systemRouter.delete("/removeSystem/:id", SystemController.delete)

export default systemRouter
