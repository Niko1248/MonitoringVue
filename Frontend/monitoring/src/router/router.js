import { createRouter, createWebHistory } from 'vue-router'
import UserPage from '../pages/UserPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import parseJwt from '../utils/parseJwt.js'
import store from '../store/index.js'
import axios from 'axios'
import Config from '../../config/index.js'

const routes = [
  {
    path: '/',
    component: LoginPage
  },
  {
    path: '/user',
    component: UserPage,
    meta: { requiresAuth: true, role: ['USER', 'ADMIN'] }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const targetRole = to.meta.role
  const userToken = localStorage.getItem('token')
  if (requiresAuth && !userToken) {
    next('/')
    return
  }

  if (userToken) {
    const { roles, username, subunit } = parseJwt(userToken)
    store.commit('parseRoles', roles[0])
    store.commit('parseUsername', username)
    store.commit('parseSubunit', subunit[0])
    await getSubunitList()
    if (targetRole && !targetRole.includes(roles[0])) {
      next('/')
      return
    } else {
      if (to.path === '/' && (roles.includes('USER') || roles.includes('ADMIN'))) {
        next('/user')
        return
      }
    }
  }
  next()
})
async function getSubunitList() {
  const response = await axios.get(`${Config.SERVER_URL}/api/getSubunitList`)
  store.commit('parseSubunitList', response.data)
  let subunitRu = Object.values(store.state.subunitList.find((el) => el[store.state.subunit]))[0]
  store.commit('parseSubunitRu', subunitRu)
}
export default router
