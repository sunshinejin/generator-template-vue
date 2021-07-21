
let MyPlugin = {}
MyPlugin.install = function (Vue, option) {
  Vue.prototype.$getConsole = function () {
    console.log('getConsole')
  }
}

export default MyPlugin
