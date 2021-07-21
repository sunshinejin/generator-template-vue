import {post, GetaWayUrl, serviceUrl} from './config/baseConfig'

export const examine = {
  // 人员审核
  userExamine: function ({data = {}} = {}) {
    return post({url: `${GetaWayUrl}/${serviceUrl.usercontrolmanager}/examine/userExamine`, data})
  }

}
