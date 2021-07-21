
export default {

  install (Vue, options) {
    Vue.prototype.tableHeaderColor = ({ row, column, rowIndex, columnIndex }) => { // 修改表格颜色
      if (rowIndex === 0) {
        return 'background-color:#f3f4f9;color: #a7a7a8;font-weight: 500;'
      }
    },
    Vue.prototype.getNowFormatDate = (value) => { // 格式化日期
      var date = new Date()
      var seperator1 = ''
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate
      return currentdate
    },
    Vue.prototype.sortByDate = (obj1, obj2) => {
      let val1 = obj1.deadline
      let val2 = obj2.deadline
      return val1 - val2
    },
    Vue.prototype.unique = (objcArray) => {
      for (var i = 0; i < objcArray.length; i++) {
        for (var j = i + 1; j < objcArray.length;) {
          if (objcArray[i].userLoginId == objcArray[j].userLoginId) { // 通过id属性进行匹配；
            objcArray.splice(j, 1) // 去除重复的对象；
          } else {
            j++
          }
        }
      }
      return objcArray
    },

    Vue.prototype.GetQueryString = (name) => { // 工具函数，截取路径后面带的参数
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2]); return null
    },

    Vue.prototype.$debounce = (func, delay) => {
      let timer
      return function (...args) {
        if (timer) {
          clearTimeout()
        }

        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    },

    Vue.prototype.$formatTime = (time, format) => {
      let dt

      format = typeof format === 'string' ? format : 'yyyy-MM-dd'

      if (time instanceof Date) {
        dt = time
      } else {
        dt = new Date(time)
      }

      var o = {
        'M+': dt.getMonth() + 1, // month
        'd+': dt.getDate(), // day
        'h+': dt.getHours(), // hour
        'm+': dt.getMinutes(), // minute
        's+': dt.getSeconds(), // second
        'q+': Math.floor((dt.getMonth() + 3) / 3), // quarter
        'S': dt.getMilliseconds()
        // millisecond
      }

      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (dt.getFullYear() + '')
          .substr(4 - RegExp.$1.length))
      }

      for (var k in o) {
        if (new RegExp('(' + k + ')').test(format))
        // eslint-disable-next-line semi
        { format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)); }
      }

      return format
    },

    Vue.prototype.$createUniqueString = () => {
      const timestamp = +new Date() + ''
      const randomNum = parseInt((1 + Math.random()) * 65536) + ''
      return (+(randomNum + timestamp)).toString(32)
    }

    // 验证cpu

    Vue.prototype.$validateCpu = (params, rule, value, callback) => {
      value = Number(value)

      if (typeof value === 'number' && !isNaN(value)) {
        if (value <= 0 || value > 4) {
          callback(new Error('CPU在 0 至 4之间且不能为0'))
        } else if (value > Number(params && params.limit_cpu.split('m')[0]) / 1000) {
          callback(new Error('申请的CPU大小不能超过剩余可分配核数'))
        } else {
          callback()
        }
      } else {
        callback(new Error('CPU必须为数字'))
      }
    }

    Vue.prototype.$validateMemory = (params, rule, value, callback) => {
      value = Number(value)

      if (typeof value === 'number' && !isNaN(value)) {
        if (value <= 0 || value > 8192) {
          callback(new Error('内存在 0 至 8192之间且不能为0'))
        } else if (value > Number(params && params.limit_memory.split('Mi')[0])) {
          callback(new Error('申请的内存大小不能超过剩余可分配内存'))
        } else {
          callback()
        }
      } else {
        callback(new Error('内存必须为数字'))
      }
    }

    Vue.prototype.$validateReplicas = (params, rule, value, callback) => {
      value = Number(value)

      if (typeof value === 'number' && !isNaN(value)) {
        if (value <= 0) {
          callback(new Error('实例数必须大于0'))
        } else if (value > Number(params && (params.limit_replicas))) {
          callback(new Error('申请的实例数目不能超过剩余可用实例数'))
        } else if (!Number.isInteger(value)) {
          callback(new Error('申请的实例数必须是整数'))
        } else {
          callback()
        }
      } else {
        callback(new Error('实例数必须为数字'))
      }
    }

    Vue.prototype.$validateTel = (rule, value, callback) => {
      const RegExp = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/

      if (RegExp.test(value)) {
        callback()
      } else {
        callback(new Error('电话格式不正确，请检查'))
      }
    }

    Vue.prototype.$checkNumber = (rule, value, callback) => {
      let regEn = /^[0-9]\d*$/
      if (!regEn.test(value)) {
        callback(new Error('请输入正整数'))
      } else {
        callback()
      }
    }

    // 1-100之间的整数
    Vue.prototype.$checkInt = (rule, value, callback) => {
      let regEn = /^([1-9]|[1-9]\d|100)$/
      if (!regEn.test(value)) {
        callback(new Error('请输入1-100之间的整数'))
      } else {
        callback()
      }
    }

    // 校验环境变量的键
    Vue.prototype.$checkKey = (rule, value, callback) => {
      let regEn = /^[-._a-zA-Z][-._a-zA-Z0-9]*$/
      if (value && !regEn.test(value)) {
        callback(new Error('键必须由横杆、点、英文大写或小写字母开头，中英文字母、横杆、点、下划线及数字结尾'))
      } else {
        callback()
      }
    }

    Vue.prototype.$ipRules = (rule, value, callback) => {
      let regEn = /^((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9]))$/
      if (!regEn.test(value)) {
        callback(new Error('请输入正确格式的ip地址'))
      } else {
        callback()
      }
    }

    // Rsa加密
    Vue.prototype.$encryptedData = function (publicKey, data) {
      // new一个对象
      let encrypt = new JSEncrypt()
      // 设置公钥
      encrypt.setPublicKey(publicKey)
      // data是要加密的数据
      let result = encrypt.encryptLong(data)
      return result
    }
  }

}
