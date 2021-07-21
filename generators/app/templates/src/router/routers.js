import Vue from 'vue'
import Router from 'vue-router'

// 登录
const login = () => import(/* webpackChunkName: "login" */'@/page/login/login.vue')


Vue.use(Router)


export default new Router({
  mode: 'hash',
  linkActiveClass: 'router-active',
  routes: [

    {
      path: '/login',
      name: 'login',
      component: login
    }, {
      path: '/',
      name: 'layout',
      component: layout,
      redirect: 'login', // 改成项目实际的首页
      children: []
    }
  ]
})
