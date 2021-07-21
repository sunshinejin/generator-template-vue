import Vue from 'vue'
import Router from 'vue-router'

// 登录
const login = () => import(/* webpackChunkName: "login" */'@/page/login/login.vue')
const layout = () => import(/* webpackChunkName: "layout" */'@/page/layout/layout.vue')

// 账户管理
const account = () => import(/* webpackChunkName: "account" */'@/page/accountManage/account.vue')

// 服务创建审核
const userCreateExamine = () => import(/* webpackChunkName: "serCreateExamine" */'@/page/workOrderSystem/userCreateExamine.vue')

// 人员管理
const userManage = () => import(/* webpackChunkName: "serSynthesiseExamine" */'@/page/userManage/user.vue')
// 临控类别
const controlType = () => import(/* webpackChunkName: "serSynthesiseExamine" */'@/page/controlType/index.vue')

Vue.use(Router)

let redirect = ''
// let type = JSON.parse(sessionStorage.getItem('vuex')).user.type
let type = sessionStorage.getItem('userType')
console.log('type+++++++', type)

if (parseInt(type) === 1) {
  redirect = 'account'
} else {
  redirect = 'controlType'
}

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
      meta: {
        keepAlive: false
      },
      redirect: redirect,
      children: [
        {
          path: 'account',
          name: 'account',
          component: account,
          meta: {
            title: '账户管理',
            keepAlive: true
          }
        }, {
          path: 'userCreateExamine',
          name: 'userCreateExamine',
          component: userCreateExamine,
          meta: {
            title: '用户审核',
            keepAlive: true
          }
        }, {
          path: 'userManage',
          name: 'userManage',
          component: userManage,
          meta: {
            title: '人员管理',
            keepAlive: false
          }
        }, {
          path: 'controlType',
          name: 'controlType',
          component: controlType,
          meta: {
            title: '临控类别',
            keepAlive: true
          }
        }
      ]
    }
  ]
})
