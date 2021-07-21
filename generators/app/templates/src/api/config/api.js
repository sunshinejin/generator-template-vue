import {loginSuccess as login,logOut } from '../login'
// import {queryDepartment, getSysUserByPage} from '../userTree'
import { crudMethod } from '../crudMethod.js'
import { project } from '../project.js'
import { myService } from '../myService.js'
import { user } from '../user.js'

// console.log("project",project);

export default {
  login, // 登录接口

  logOut, // 退出登录

  crudMethod ,// 项目内的所有表格相关api
  
  project,   // 镜像仓库-项目 菜单模块api

  myService,  // 我的服务相关接口

  user // 用户相关接口

}
