
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

    Vue.prototype.$validateTel = (rule, value, callback) => {
      const RegExp = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/

      if (value && !RegExp.test(value)) {
        callback(new Error('电话格式不正确，请检查'))
      } else {
        callback()
      }
    }

    Vue.prototype.$checkNumber = (rule, value, callback) => {
      let regEn = /^[0-9]\d*$/
      if (value && !regEn.test(value)) {
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

    Vue.prototype.$checkPassword = (rule, value, callback) => {
      var regEn = /^(?![A-z0-9]+$)(?![A-z~!@#$%&*()_:=]+$)(?![0-9~!@#$%&*()_:=]+$)([A-z0-9~!@#$%&*()_:=]{8,16})$/
      if (value.length < 6 || value.length > 16) {
        callback(new Error('密码长度至少6位,至多16位'))
      } else if (!regEn.test(value)) {
        callback(new Error('密码只能由数字、字母和特殊字符组成,特殊字符包含~ ! @ # $ % ^ &  * ( ) _ : = .'))
      } else {
        callback()
      }
    }

    // // Rsa加密
    // Vue.prototype.$encryptedData = (publicKey, data) => {
    //   // new一个对象
    //   let encrypt = new JSEncrypt()
    //   // 设置公钥
    //   encrypt.setPublicKey(publicKey)
    //   // data是要加密的数据
    //   let result = encrypt.encryptLong(data)
    //   return result
    // }

    Vue.prototype.$checkIdNum = (rule, value, callback) => {
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (value && !reg.test(value)) {
        return callback(new Error('证件号码不正确'))
      } else {
        callback()
      }
    }
  }

}
