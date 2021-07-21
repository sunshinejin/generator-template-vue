<template>
<div class="loginPage" v-loading="loading">

  <div class="bg"></div>

    <el-row type="flex" justify="center">
      <el-col :span="6" class="mt70">
          <!-- <a class="thumbnail" title="查看平台使用指南文档" :href="address">点击</a> -->
               <div class="tilte">临控人员管理系统</div>

                <el-form ref="loginForm" :model="form" label-width="80px" :rules="loginRules" >

                       <el-form-item prop="userName">
                             <el-input v-model="form.userName"></el-input>
                       </el-form-item>

                      <el-form-item prop="userPwd">
                             <el-input type="password" v-model="form.userPwd"></el-input>
                       </el-form-item>

                       <el-form-item>
                          <el-button type="primary" class="getLogin" @click="onSubmit('loginForm')" >
                              <span v-if="!loading">登录</span>
                              <span v-else>登 录 中...</span>
                          </el-button>
                       </el-form-item>

                </el-form>

                 <!-- <div class="version">版本号：v{{version}}</div> -->

      </el-col>
  </el-row>

</div>

</template>

<script>
// import config from '../../../package.json'
import md5 from 'blueimp-md5'
export default {
  name: 'login',
  data () {
    return {
      form: {
        userName: '',
        userPwd: ''
      },
      loginRules: {
        userName: [{required: true, trigger: 'blur', message: '用户名不能为空'}],
        userPwd: [{required: true, trigger: 'blur', message: '密码不能为空'}]
      },
      loading: false
      // version: config.version
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    onSubmit (loginForm) {
      this.loading = true
      this.$refs[loginForm].validate(valid => {
        let user = {
          userName: this.form.userName,
          userPwd: md5(this.form.userPwd)
        }
        // user = JSON.stringify(user)
        console.log('user', user)
        this.$store.dispatch('Login', user).then((data) => {
          this.loading = false

          let type = data.type
          // sessionStorage.setItem('userType')
          if (type === 1) {
            this.$router.push({path: '/account'})
          } else {
            this.$router.push({path: '/userManage'})
          }

          // this.$router.push({path: '/'})
        }).catch(() => {
          this.loading = false
        })
      })
    },

    enterKey (event) {
      const code = event.keyCode
        ? event.keyCode
        : event.which
          ? event.which
          : event.charCode
      if (code === 13) {
        this.onSubmit('loginForm')
      }
    },

    enterKeyup () {
      document.addEventListener('keyup', this.enterKey)
    },
    enterKeyupDestroyed () {
      document.removeEventListener('keyup', this.enterKey)
    }

  },
  created () {
    console.log('+++++++')
  },
  mounted () {
    document.addEventListener('keyup', this.enterKey)
  },
  destroyed () {
    this.enterKeyupDestroyed()
  }
}
</script>

<style scoped lang="less">

.loginPage {
  height: 100%;
  .tilte {
        margin-bottom: 35px;
        margin-left: 80px;
        width: 280px;
        font-size: 22px;
        color: #1A1A1A;
        text-align: left;
  }

  /deep/ .el-form-item{
      margin-bottom: 16px;
  }

  .mt70 {
    margin-top: 70px;
  }

  .el-form {
      width: 72%;
  }

  .bg {
      height:45%;

      background: url("../../assets/images/operation.png") no-repeat;
      background-size: cover;
      position: relative;
  }

  .getLogin {
      width: 100%;
      color: #fff;
      background-color: #3771C9;
  }

.el-input /deep/ .el-input__inner {
        border: 1px solid #C9C9C9;
}

.el-input /deep/ .el-input__inner:focus{
        border-color: #3771C9;
}
// .version{
//       text-align: left;
//      margin-left: 80px;
// }

}

</style>
