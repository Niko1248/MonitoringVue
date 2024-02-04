import { Router } from "express"
import { check } from "express-validator"
import AuthController from "../controllers/AuthController.js"
import roleMiddleware from "../middlewares/roleMiddleware.js"

const authRouter = new Router()

authRouter.post(
  "/registration",
  [
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check("password", "Пароль должен быть больше 4 и меньше 10 символов").isLength({ min: 4, max: 10 }),
    check("role", "Не выбрана роль").notEmpty(),
  ],
  AuthController.registration
)
authRouter.post("/login", AuthController.login)
authRouter.get("/users", roleMiddleware(["USER, ADMIN"]), AuthController.getUsers)

export default authRouter
