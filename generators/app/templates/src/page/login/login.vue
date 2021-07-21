<template>
<div class="loginPage" v-loading="loading">

  <div class="bg"></div>

    <el-row type="flex" justify="center">
      <el-col :span="6" class="mt70">
               <div class="tilte">管理平台</div>

                <el-form ref="loginForm" :model="form" label-width="80px" :rules="loginRules" >

                       <el-form-item prop="userName">
                             <el-input v-model="form.userName"></el-input>
                       </el-form-item>

                      <el-form-item prop="passWord">
                             <el-input type="password" v-model="form.passWord"></el-input>
                       </el-form-item>

                       <el-form-item>
                          <el-button type="primary" class="getLogin" @click="onSubmit('loginForm')" >
                              <span v-if="!loading">登录</span>
                              <span v-else>登 录 中...</span>
                          </el-button>
                       </el-form-item>

                </el-form>

                 <div class="version">版本号：v{{version}}</div>

      </el-col>
  </el-row>


</div>

</template>

<script>
import config from '../../../package.json'

export default {
  name: 'login',
  data () {
    return {
      // address:'./static/pdf/web/viewer.html?file='+encodeURIComponent("星火容器云管理平台使用指南.pdf"),
      form: {
        userName: '',
        passWord: ''
      },
      loginRules: {
        userName: [{required: true, trigger: 'blur', message: '用户名不能为空'}],
        passWord: [{required: true, trigger: 'blur', message: '密码不能为空'}]
      },
      loading: false,
      version: config.version
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
      this.$refs[loginForm].validate(valid => {
        let user = {
          user_id: this.form.userName,
          password: this.form.passWord
        }
        user = JSON.stringify(user)
        // RSA加密
        const publicKey = this.$store.state.user.publicKey

        let encryptUser = this.$encryptedData(publicKey, user)

        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', encryptUser).then(() => {
            this.loading = false
            this.$message({
              message: '登录成功！',
              duration: 1000
            })

           this.$router.push({path:'index'})
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('提交报错!!')
          return false
        }
      })
      console.log('this.form', this.form)
    },

    enterKey (event) {
      const code = event.keyCode
        ? event.keyCode
        : event.which
          ? event.which
          : event.charCode
      if (code == 13) {
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
.version{
      text-align: left;
     margin-left: 80px;
}

}

</style>
