// 外地部署 各地网关地址
let objUrl = {
  hulianwang: 'http://10.3.4.5:2000' // 二类网本地
 
}

let origin = location.origin

let GetaWayUrl

let version = 'v1' // 后端服务接口版本

if (origin.includes('localhost')) {
  GetaWayUrl = objUrl.jinyuan
} else {
  GetaWayUrl = origin
}

export {

  GetaWayUrl,

  version,

  origin

}
