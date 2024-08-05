import { Router } from "express"
import { check } from "express-validator"
import AuthController from "../controllers/AuthController.js"
import roleMiddleware from "../middlewares/roleMiddleware.js"
import subunitMiddleware from "../middlewares/subunitMiddleware.js"

const authRouter = new Router()
authRouter.get("/activeUsers", subunitMiddleware(["gcs", "cskp"]), AuthController.getActiveUsers)
authRouter.post(
  "/registration",
  [
    check("username", "Имя пользователя не может быть пустым").trim().notEmpty(),
    check("password", "Пароль должен быть больше 4 и меньше 10 символов").trim().isLength({ min: 4, max: 10 }),
    check("roles", "Не выбрана роль").notEmpty(),
    check("subunit", "Не выбрано подразделение").notEmpty(),
    roleMiddleware(["ADMIN"]),
  ],
  AuthController.registration
)
authRouter.post("/login", AuthController.login)
authRouter.post("/heartbeat", AuthController.heartbeat)

export default authRouter
