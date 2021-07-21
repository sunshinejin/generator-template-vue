<template>
  <div id="app">
    <!-- <div>11111</div> -->
    <!-- 这里是需要缓存的 -->
     <transition>
       <keep-alive>
            <router-view v-if="$route.meta.keepAlive"/>
       </keep-alive>
      </transition>

       <!-- 这里不会被缓存 -->

      <transition>
           <router-view v-if="!$route.meta.keepAlive"/>
      </transition>

  </div>
</template>

<script>

import mixinsUser from './mixins/user.js'
import {GetaWayUrl, get,origin} from './api/config/baseConfig'

export default {

  mixins: [mixinsUser],

  name: 'App',

  data () {
    return {

    }
  },

  components: {

  },

  methods: {
    // 防止线上更新后还有手动刷新页面才能更新数据，每次发包需要手动修改下static里边的json文件版本号
    checkVersion () {
      let url = origin
      if (origin.includes('localhost')) {
        url = '../static/version.json'
      } else {
        url = `${GetaWayUrl}/xh-cloud/xh-paas/static/version.json`
      }
      get({url: url, headers: {'cacheControl': 'no-cache'}}) // 反正就是要请求到json文件的内容, 并且禁止缓存
        .then(res => {
          const version = res.version
          const clientVersion = localStorage.getItem('_version_')
          console.log('最新版本>>', version)
          console.log('当前版本>>', clientVersion)

          // 和最新版本不同，刷新页面
          if (version !== clientVersion) {
            localStorage.setItem('_version_', version)
            window.location.reload()
          }
        })
    },
       // 获取全局公钥
    getEncryptKey(){

      this.$api.user.getPublicKey().then((res) => {
          console.log('res',res)
          this.$store.commit('SET_PUBLIC_KEY',res.data.public_key)
      })

    }
  },

  provide () {
    return {
      app: this
    }
  },
  created () {
    this.getEncryptKey()
    setInterval(() => {
      this.checkVersion()
    }, 60000) // 1分钟一次
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/* body{
  overflow: hidden;
} */
</style>
