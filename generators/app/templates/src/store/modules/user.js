import {login} from '../../api/login.js'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import {JSEncrypt} from 'jsencrypt'
import * as mutationType from '../mutation-type'
import Vue from 'vue'
const vue = new Vue()
console.log('vue.$confirm', vue.$confirm)
const user = {
  state: {
    accessToken: '',
    id: '',
    userName: '',
    type: '' // 身份标识，1-管理员 2-普通管理员
  },
  mutations: {
    [mutationType.SET_TOKEN] (state, token) {
      state.accessToken = token
    },
    [mutationType.SAVE_LOGIN_INFO]: (state, status) => {
      state.accessToken = status.accessToken
      state.id = status.id
      state.userName = status.userName
      state.type = status.type
    }
  },
  actions: {
    // 登录
    Login ({ dispatch, commit }, {userName, userPwd}) {
      return new Promise((resolve, reject) => {
        login.loginSuccess({
          data: {
            userName,
            userPwd
          }
        }).then(res => {
          // 保存用户信息
          sessionStorage.setItem('userType', res.data.type)
          commit('SAVE_LOGIN_INFO', res.data)

          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 校验token是否有效的接口
    VerifyToken ({ dispatch, commit }, tokenInfo) {
      return new Promise((resolve, reject) => {
        login.verifyToken({data: {
          accessToken: tokenInfo.accessToken
        }}).then(res => {
          // setUserInfo(res.data, commit)
          resolve(res)
        }).catch(error => {
          // 跳转到登录页面
          // debugger
          if (!error) {
            vue.$confirm(
              '登录状态已失效，您可以继续留在该页面，或者重新登录',
              '系统提示',
              {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
              }
            ).then(() => {
              dispatch('LoginOut', {accessToken: tokenInfo.accessToken}).then(() => {
                location.reload() // 为了重新实例化vue-router对象 避免bug
                this.$router.push({path: '/login'})
              })
            })
          }

          reject(error)
        })
      })
    },
    LoginOut ({ commit }, tokenInfo) {
      return new Promise((resolve, reject) => {
        login.logOut({
          data: {
            accessToken: tokenInfo.accessToken,
            flag: 1
          }
        }).then(res => {
          commit(mutationType.SET_TOKEN, '')
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    }

  }
}

export default user
