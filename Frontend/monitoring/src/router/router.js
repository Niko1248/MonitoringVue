import { createRouter, createWebHistory } from "vue-router"
import UserPage from "../pages/UserPage.vue"
import LoginPage from "../pages/LoginPage.vue"
import parseJwt from "../utils/parseJwt.js"

const routes = [
  {
    path: "/",
    component: LoginPage,
  },
  {
    path: "/user",
    component: UserPage,
    meta: { requiresAuth: true, role: "USER" },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const targetRole = to.meta.role
  const userToken = localStorage.getItem("token")
  console.log(userToken)
  if (requiresAuth && !userToken) {
    next("/")
    return
  }

  if (userToken) {
    const userRole = parseJwt(userToken).roles
    if (targetRole && !userRole.includes(targetRole)) {
      next("/")
      return
    } else {
      if (to.path === "/" && userRole.includes("USER")) {
        next("/user")
        return
      }
    }
  }
  next()
})
export default router
