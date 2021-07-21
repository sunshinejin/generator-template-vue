
import axios from 'axios'
import router from '@/router/routers.js'
import store from '../../store'
import {idKey} from './appIdSecretKey'
// import {idKey} from './appIdSecretKey'

import Vue from 'vue'

console.log('store++++++++++++++++', store)

let _this = new Vue()
// let loadingInstance // loading实例

// 创建axios实例
let service = axios.create({ timeout: 1000 * 12 })

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */

const tip = msg => {
  _this.$message({
    message: msg,
    duration: 1000
  })
}

/**
* 跳转登录页
* 携带当前页面路由，以期在登录页面完成登录后返回当前页面
* */
// const toLogin = () => {
//   router.replace({
//     path: '/login',
//     query: {
//       redirect: router.currentRoute.fullPath
//     }
//   })
// }

/*
* 请求失败后的错误统一处理
* @param {Number} status 请求失败的状态码
* */
const errorHandle = (status, error) => {
  if (error.toString().indexOf('Error: timeout') !== -1) {
    _this.$message({
      message: '网络请求超时',
      duration: 2500
    })
    return Promise.reject(error)
  }
  if (error.toString().indexOf('Error: Network Error') !== -1) {
    Notification.error({
      title: '网络请求错误',
      duration: 2500
    })
    return Promise.reject(error)
  }
  //  状态码判断
  switch (status) {
    case 501:
      _this.$confirm(
        '登录状态已过期，您可以继续留在该页面，或者重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('LoginOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
          _this.$router.push({path: '/login'})
        })
      })
      break
    // 403 token过期
    // 清除token并跳转到登录页
    case 403:
      // tip('登录过期，请重新登录')
      // localStorage.removeItem('token')
      // store.commit('loginSuccess', null)
      router.push({ path: '/401' })
      break
    case 404:
      tip('请求的资源不存在')
      break
    case 603:
      _this.$confirm(
        '无效的token，您可以继续留在该页面，或者重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('LoginOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
          _this.$router.push({path: '/login'})
        })
      })
      break
    default:
      console.log(error)
  }
}

// 设置post请求头
// service.defaults.headers.post['content-Type'] = 'application/json;charset=UTF-8'

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
service.interceptors.request.use(
  config => {
    let {contentType = 'application/json;charset=UTF-8', processData = false, cacheControl = 'no-cache', secretKey = idKey.secretKey, applyID = idKey.applyID, requestType = 'tymh', userInfo = 'null'} = config.headers

    let headers = {
      'processData': processData,
      'Content-Type': contentType,
      'Cache-Control': cacheControl,
      secretKey,
      applyID,
      userInfo,
      requestType
    }

    config.headers = {...headers, ...config.headers}
    // store.state.user.token = '1d454225ed4b41eb82fdd1f18bf9bf27'

    if (store.state.user.accessToken) {
      // 默认给请求头加上token
      config.headers['accessToken'] = store.state.user.accessToken
    }

    // // 处理Content-Type类型不同
    // if (config.url.indexOf('/login') !== -1 || config.url.indexOf('/verifyToken') !== -1) {
    //   config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    //   console.log('configdata', config.data)
    //   config.data = Qs.stringify(config.data)
    // } else if (config.url.indexOf('.aliyuncs.com') !== -1) {
    //   // 此处设置文件上传，配置单独请求头
    //   config.headers['Content-Type'] = 'multipart/form-data'
    // } else {
    //   config.headers['Content-Type'] = 'application/json'
    //   config.data = JSON.stringify(config.data)
    // }
    // 全局加loading
    // loadingInstance = _this.$loading({
    //   target: document.querySelector('.el-main'),
    //   fullscreen: false
    // })
    return config
  },
  error => {
    // _this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
    //   loadingInstance.close()
    // })
    console.log(error) // for debug
    Promise.error(error)
  }
)

// 响应拦截器
service.interceptors.response.use(

  //  请求成功
  res => {
    // _this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
    //   loadingInstance.close()
    // })

    if ((res.data.code && res.data.code < 200) || (res.data.code && res.data.code > 300) || res.data.success === false || (res.data.errorCode && res.data.errorCode !== 200)) {
      _this.$message({
        message: res.data.result || res.data.errMsg || res.data.msg
      })
      // eslint-disable-next-line prefer-promise-reject-errors
      errorHandle(res.data.code || res.data.errorCode || res.data.errCode, res.data.result || res.data.msg || res.data.errMsg)
      return Promise.reject(res.data.result || res.data.msg || res.data.errMsg || res.data.success)
      // return Promise.reject('error')
    } else {
      return Promise.resolve(res.data)
    }
  },
  // 请求失败
  error => {
    // _this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
    //   loadingInstance && loadingInstance.close()
    // })
    try {
      let code = 0
      const { response } = error
      code = error.response.data.status
      errorHandle(code, response.data.error)
      return Promise.reject(response.data.error)
    } catch (error) {
      console.log('error', error)
    }
  }

)

// 封装get请求
export function get ({method = 'get', url, data, headers = {}} = {}) {
  let sendObject = {
    url,
    method,
    headers,
    params: data
  }

  console.log('sendObject', sendObject)

  return service(sendObject)
}

//   封装post请求
export function post ({method = 'post', url, data, headers = {}} = {}) { // 对象一定要设置默认值{},不然config里边的 heasers是 unfined
  // 默认配置
  let sendObject = {
    url,
    method,
    headers,
    data,
    timeout: 1000 * 60 * 5
  }

  console.log('sendObject', sendObject)

  // sendObject.data = JSON.stringify(data)

  return service(sendObject)
}

//  封装put方法 (resfulAPI常用)

export function put (url, data = {}, headers) {
  return service({
    url: url,
    method: 'put',
    headers: headers,
    data: JSON.stringify(data)
  })
}

// 删除方法(resfulAPI常用)
export function deletes (url) {
  return service({
    url: url,
    method: 'delete'
  })
}

// 文件上传
let instance = axios.create({

})

instance.interceptors.request.use(config => {
  config.headers = {
  }

  return config
})

//  instance.defaults.headers.post['Content-Type'] = 'multipart/form-data'
// instance.defaults.headers.post['xh-cloud-token'] = _this.$store.state.user.token

Vue.prototype.$instance = instance

export {
  service
}
