<template>
  <div class="container flex" v-loading="loading">
    <div class="logoTxt flex">
      <div class="logo"></div>
      <!-- <img src='../../../assets/images/logo.png' > -->
      <div class="title">临控人员管理系统</div>
    </div>

    <div class="logout-btn">

      <img
        src="../../../assets/images/policeicon.png"
        class="headerImage"

      />
      <el-dropdown @command="handleCommand" trigger="hover">
        <span class="el-dropdown-link">
          {{ loginUser }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <!-- 退出 -->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logOut">注销</el-dropdown-item>
          <el-dropdown-item command="updatePassword">
            修改密码
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 修改密码 -->
    <UpdatePassword
      :is-visibility="updatePasswordVisible"
      @closeChild="closeDialog"
      @savePassword="getPassword"
    ></UpdatePassword>
  </div>
</template>

<script>
import md5 from 'blueimp-md5'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      updatePasswordVisible: false,
      loading: false,
      loginUser: this.$store.state.user.userName
    }
  },

  activated () {
    this.loginUser = this.$store.state.user.userName
  },

  methods: {

    logOut () {
      this.loading = true
      this.$store
        .dispatch('LoginOut', {accessToken: this.$store.state.user.accessToken})
        .then(() => {
          this.loading = false
          this.$router.push({ path: '/login' })
        })
        .catch(() => {
          this.loading = false
          this.$router.push({ path: '/login' })
        })
    },

    handleCommand (type) {
      if (type === 'updatePassword') {
        this.updatePassword()
      } else {
        this.logOut()
      }
    },
    updatePassword () {
      this.updatePasswordVisible = true
    },
    closeDialog () {
      this.updatePasswordVisible = false
    },
    getPassword (obj) {
      // 掉接口，关闭弹窗
      this.$api.accountManage.resetPwd({
        data: {
          userId: this.$store.state.user.id,
          userPwd: md5(obj.password)
        }
      }).then(() => {
        this.$notify({
          title: '密码修改成功!',
          type: 'success',
          duration: 2500
        })
        this.updatePasswordVisible = false
      }).catch((error) => {
        console.log(new Error(error))
        this.updatePasswordVisible = false
      })
    }
  }
}
</script>

<style lang='less' scoped>
.container {
  justify-content: space-between;
  height: 100%;
  align-items: center;
  font-size: 16px;
  width: 100%;
  color: #fff;
  a {
    color: #fff;
  }
  .logo {
    width: 60px;
    height: 40px;
    background-image: url("../../../assets/images/logo.png");
    background-position: -20px 0;
  }
  .logoTxt {
    width: 300px;
    text-align: left;
    padding: 0 14px;
    .title {
      font-size: 18px;
    }
  }
  .supplier {
    width: 280px;
  }

  .unit-log {
    width: 150px;
  }

  .user-info-dropdown {
    width: 100px;
  }
  .user-img {
    width: 45px;
    height: 45px;
    margin-right: 10px;
    border-radius: 50%;
  }

  .logout-btn {
    margin-right: 50px;
    display: flex;
    align-items: center;
    .news {
      width: 40px; /* no*/
      height: 40px; /* no*/
      background-image: url("../../../assets/images/xiaoxi.png");
      background-position: center;
      background-repeat: no-repeat;
    }
    .thumbnail {
      cursor: pointer;
      width: 90px;
      height: 40px;
      background-image: url("../../../assets/images/suoluetu.png");
      background-position: center;
      background-repeat: no-repeat;
    }
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #fff;
    margin-left: 8px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .headerImage {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
}
</style>
