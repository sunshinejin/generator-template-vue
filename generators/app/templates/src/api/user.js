
import {post,get, GetaWayUrl, version, serviceUrl} from './config/baseConfig'

export const user = {

    getPublicKey: function ({data = {}} = {}) {
         return get({url: `${GetaWayUrl}/xh-cloud/${serviceUrl.userUrl}/${version}/xxx`, data})
    }

}