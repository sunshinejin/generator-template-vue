import {post, GetaWayUrl, serviceUrl} from './config/baseConfig'

export const userCat = {
  // 查询人员列表
  queryCatList: function ({data = {}} = {}) {
    return post({url: `${GetaWayUrl}/${serviceUrl.usercontrolmanager}/userCat/queryCatList`, data})
  }

}
