import router from './routers'
import store from '@/store'
import Vue from 'vue'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
// import { buildMenus } from '@/api/menu'
// import { filterAsyncRouter } from '@/store/modules/permission'

// NProgress.configure({ showSpinner: false })// NProgress Configuration

var _this = new Vue()

const whiteList = ['/login']// no redirect whitelist

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
    next()
  }
  NProgress.start() // start progress bar

  console.log('store.state', store.state)
  // 已登录且要跳转的页面是登录页
  if (store.state.user.accessToken) {
    // // 校验token是否失效

    store.dispatch('VerifyToken', {accessToken: store.state.user.accessToken})

    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      NProgress.done()
      next()
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      _this.$message({
        message: 'token失效,将跳转到登录页.....'
      })
      NProgress.done()
      next(`/login`)
    }
  }
})

// export const loadMenus = (next, to) => {
//   buildMenus().then(res => {
//     const asyncRouter = filterAsyncRouter(res)
//     asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
//     store.dispatch('GenerateRoutes', asyncRouter).then(() => { // 存储路由
//       router.addRoutes(asyncRouter) // 动态添加可访问路由表
//       next({ ...to, replace: true })// hack方法 确保addRoutes已完成
//     })
//   })
// }
router.afterEach(() => {
  NProgress.done() // finish progress bar
})
