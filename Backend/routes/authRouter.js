import { Router } from "express"
import { check } from "express-validator"
import AuthController from "../controllers/AuthController.js"
import roleMiddleware from "../middlewares/roleMiddleware.js"

const authRouter = new Router()

authRouter.post(
  "/registration",
  [
    check("username", "Имя пользователя не может быть пустым").trim().notEmpty(),
    check("password", "Пароль должен быть больше 4 и меньше 10 символов").trim().isLength({ min: 4, max: 10 }),
    check("roles", "Не выбрана роль").notEmpty(),
    check("subunit", "Не выбрано подразделение").notEmpty(),
    roleMiddleware(["ADMIN", "SUPERADMIN"]),
  ],
  AuthController.registration
)
authRouter.post("/login", AuthController.login)

export default authRouter
