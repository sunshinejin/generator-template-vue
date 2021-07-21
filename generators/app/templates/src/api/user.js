
import {post, GetaWayUrl, serviceUrl} from './config/baseConfig'

export const user = {
  // 查询人员列表
  queryUserList: function ({data = {}} = {}) {
    return post({url: `${GetaWayUrl}/${serviceUrl.usercontrolmanager}/user/queryUserList`, data})
  },

  // 查询人员详情
  queryUserInfo: function ({data = {}} = {}) {
    return post({url: `${GetaWayUrl}/${serviceUrl.usercontrolmanager}/user/queryUserInfo`, data})
  },

  // 删除人员
  removeUser: function ({data = {}} = {}) {
    return post({url: `${GetaWayUrl}/${serviceUrl.usercontrolmanager}/user/removeUser`, data})
  },

  // 保存人员
  saveUser: function ({data = {}} = {}) {
    return post({url: `${GetaWayUrl}/${serviceUrl.usercontrolmanager}/user/saveUser`, data})
  },

  // 更新人员
  updateUser: function ({data = {}} = {}) {
    return post({url: `${GetaWayUrl}/${serviceUrl.usercontrolmanager}/user/updateUser`, data})
  }

}
