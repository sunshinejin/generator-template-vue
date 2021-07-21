// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import store from '@/store'
import router from '@/router/routers.js'
import '@/assets/js/element-ui.js' // element-ui按需引入
import echarts from '@/assets/js/echarts.js' // echarts按需引入
import VueBus from '@/assets/js/bus.js' // 中央事件总线
import './utils/flexible.js'
import API from '@/api/config/api' // 所有的接口数据
import '@/assets/less/base.less'
import 'normalize.css/normalize.css'
import '@/assets/less/common.less'
import '@/assets/less/transition.less'
import './router/index' //
import './assets/icon/iconfont.css'
import '@/assets/less/font.less'
import { JSEncrypt } from './utils/jsencrypt'
import Base from './utils/base.js'
import './components/index'
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'

Vue.use(VueCodemirror)

// test

// import { info } from "./components/alert.js";
// console.log("info",info)
// Vue.prototype.$Alert = info;

// var echarts = require('echarts')
Vue.prototype.$echarts = echarts

Vue.use(Base)

Vue.prototype.$api = API // 挂载到Vue原型上面

Vue.use(VueBus)

Vue.config.productionTip = false

Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
