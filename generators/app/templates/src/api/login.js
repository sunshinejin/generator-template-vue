import {post, GetaWayUrl,version,serviceUrl} from './config/baseConfig'

// export default{
//   serviceUrlSuccess: (data) => {
//     return post({url: `${GetaWayUrl}${serviceUrl.ssosupplier_Url}/v1/user/login`, data, headers: {contentType: 'application/x-www-form-urlencoded'}})
//   },
//   getInfo: (data) => {
//     return post({url: `${GetaWayUrl}${serviceUrl.ssosupplier_Url}/sso/oauth2/verifyToken`, data})
//   }
// }

export function loginSuccess ({data={}}={}) {
  // return post({url: `${GetaWayUrl}/xh-cloud/${version}/user/login`, data})
  return post({url: `${GetaWayUrl}/${serviceUrl.userUrl}/${version}/user/login`, data})
}
\
export function logOut ({data={}}={}) {
  return post({url: `${GetaWayUrl}/${serviceUrl.userUrl}/${version}/user/logout`, data})
}

