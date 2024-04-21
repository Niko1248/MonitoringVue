import { Router } from "express"
import systemRouter from "./systemRouter.js"
import logsRouter from "./logsRoutes.js"
import authRouter from "./authRouter.js"

const router = new Router()

router.use("/systems", systemRouter)
router.use("/logs", logsRouter)
router.use("/auth", authRouter)
export default router
