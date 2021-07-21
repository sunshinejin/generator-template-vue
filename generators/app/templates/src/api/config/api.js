import {login} from '../login.js'
import { crudMethod } from '../crudMethod.js'
import { user } from '../user.js'
import { userCat } from '../userCat.js'
import { examine } from '../examine.js'
import { accountManage } from '../account.js'

export default {
  login, // 登录相关接口

  crudMethod, // 项目内的所有表格相关api

  user, // 用户相关接口

  userCat, // 临控类别接口

  examine, // 审核相关接口

  accountManage // 账号相关接口

}
