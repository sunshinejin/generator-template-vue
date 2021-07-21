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
   
  },

  provide () {
    return {
      app: this
    }
  },
  created () {
    // this.checkVersion()
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
