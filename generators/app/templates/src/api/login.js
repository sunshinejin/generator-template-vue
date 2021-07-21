import {post, get, GetaWayUrl, serviceUrl} from './config/baseConfig'

export const login = {

  loginSuccess: function ({data = {}} = {}) {
    return post({url: `${GetaWayUrl}/${serviceUrl.ssosupplier}/supplier/login`, data})
  },

  verifyToken: function ({data = {}} = {}) {
    return get({url: `${GetaWayUrl}/${serviceUrl.ssosupplier}/sso/token/verifyTokenNew`, data})
  },

  logOut: function ({data = {}} = {}) {
    return post({url: `${GetaWayUrl}/${serviceUrl.ssosupplier}/sso/token/logout`, data})
  }

}
