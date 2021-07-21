import {post, GetaWayUrl, serviceUrl} from './config/baseConfig'

export const accountManage = {
  // 查询人员列表
  resetPwd: function ({data = {}} = {}) {
    return post({url: `${GetaWayUrl}/${serviceUrl.sysUserAction}/resetPwd`, data})
  }

}
