import { Router } from "express"
import systemRouter from "./systemRouter.js"

const router = new Router()

router.use("/router", systemRouter)

export default router
