// 外地部署 各地网关地址
let objUrl = {

  jinyuan: '' // 二类网市局

}

let origin = location.origin

let GetaWayUrl

// let version = 'v2' // 后端服务接口版本

if (origin.includes('localhost')) {
  GetaWayUrl = objUrl.jinyuan
} else {
  GetaWayUrl = origin
}

export {

  GetaWayUrl,

  origin

}
