import login from '../../api/config/api'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import {JSEncrypt} from 'jsencrypt'
import * as mutationType from '../mutation-type'

const user = {
  state: {
    token: '',
    id: '',
    loginId: '',
    loginUserName: '',
    user_id: '',
    privilege: '',
    user_name: '',
    publicKey: ''
  },
  mutations: {
    [mutationType.SET_TOKEN] (state, token) {
      state.token = token
    },
    [mutationType.SAVE_LOGIN_INFO]: (state, status) => {
      console.log('status', status)
      state.token = status.token
      state.privilege = status.privilege
      state.user_id = status.user_id
      state.user_name = status.user_name
    },
    // 公钥
    [mutationType.SET_PUBLIC_KEY] (state, key) {
      state.publicKey = key
    },
  },
  actions: {
    // 登录
    Login ({ dispatch, commit }, userInfo) {

      return new Promise((resolve, reject) => {
        login.login({
          data: {
            data:userInfo
          }
        }).then(res => {
          // setToken(res.data.loginUserInfo.token)
          // 保存用户信息
          console.log('userData', res.data)
          sessionStorage.setItem('userType', res.data.privilege)
          commit('SAVE_LOGIN_INFO', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 校验token是否有效的接口
    VerifyToken ({ commit }, tokenInfo) {
      return new Promise((resolve, reject) => {
        login.verifyToken({token: tokenInfo.token}).then(res => {
          // setUserInfo(res.data, commit)
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    LoginOut ({ commit }) {
      return new Promise((resolve, reject) => {
        login.logOut().then(res => {
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
