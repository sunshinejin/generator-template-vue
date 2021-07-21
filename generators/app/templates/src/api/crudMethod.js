
// 通用的增删改查接口，适用于新增或编辑时只掉一个接口的

import {post, GetaWayUrl,version,serviceUrl} from './config/baseConfig'


export const crudMethod = {

/**,
 * url:String
 * data:Object
 */

add: function({url,serviceNameAddr,data={}}={}){

    return post({url: `${GetaWayUrl}/xh-cloud/${serviceNameAddr}/${version}/${url}`, data})

},

edit: function({url,serviceNameAddr,data={}}={}){

    return post({url: `${GetaWayUrl}/xh-cloud/${serviceNameAddr}/${version}/${url}`, data})

},


initData: function({url,serviceNameAddr,data={}}={}){

    return post({url: `${GetaWayUrl}/xh-cloud/${serviceNameAddr}/${version}/${url}`, data})

},

del: function({url,serviceNameAddr,data={}}={}){

    return post({url: `${GetaWayUrl}/xh-cloud/${serviceNameAddr}/${version}/${url}`, data})

},

delAll: function({url,serviceNameAddr,data={}}={}){

    return post({url: `${GetaWayUrl}/xh-cloud/${serviceNameAddr}/${version}/${url}`, data})

}



}
