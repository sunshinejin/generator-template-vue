<template>
  <div class="container flex">

        <div class="logoTxt flex">
          <div class="logo"></div>
            <!-- <img src='../../../assets/images/logo.png' > -->
            <div class="title">云管理员平台</div>
        </div>

     

        <div class="logout-btn">
            <div class="news"></div>
            <img src='../../../assets/images/zdl.png' class="headerImage" v-if="userType === 1">
            <img src='../../../assets/images/policeicon.png' class="headerImage" v-else>
            <el-dropdown  @command="handleCommand"  trigger="click">
            <span class="el-dropdown-link">
               {{loginUser}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <!-- 退出 -->
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logOut">注销</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>

        </div>

    </div>
</template>

<script>
export default {
  name: '',
  components: {
  },
  props: {
  },
  data () {
    return {
      userType: parseInt(this.$store.state.user.privilege),
      loginUser: this.$store.state.user.user_name,
      url:''
    }
  },

  methods: {
    sureHeight: function () {
      let element = document.getElementById('iframe')
      element.style.height = window.screen.height + 'px'
    },
    logOut () {
      this.$store.dispatch('LoginOut').then(() => {
        this.$router.push({path: '/login'})
      }).catch(() => {
        this.$router.push({path: '/login'})
      })
    },

    handleCommand (type) {
      this.logOut()
    },

  
  }
}
</script>

<style lang='less' scoped>
  
    .container{
            justify-content: space-between;
            height: 100%;
            align-items: center;
            font-size: 16px;
            width: 100%;
            color: #fff;
            a{
                color: #fff;
            }
            .logo{
              width: 60px;
              height: 40px;
              background-image: url('../../../assets/images/logo.png');
              background-position: -20px 0;
            }
            .logoTxt{
                width: 300px;
                text-align: left;
                padding: 0 14px;
                .title{
                   font-size: 18px;
                }
            }
            .supplier{
                    width: 280px;
            }

            .unit-log{
                width: 150px;
            }

            .user-info-dropdown{
                width: 100px;
            }
            .user-img{
                width: 45px;
                height: 45px;
                margin-right: 10px;
                border-radius: 50%;
            }

            .logout-btn{
                margin-right: 50px;
                display: flex;
                align-items: center;
                .news{
                    width: 40px ;/* no*/
                    height: 40px ; /* no*/
                    background-image: url('../../../assets/images/xiaoxi.png');
                    background-position: center;
                    background-repeat: no-repeat;
                }
                .thumbnail{
                    cursor: pointer;
                     width: 90px;
                    height: 40px;
                    background-image: url('../../../assets/images/suoluetu.png');
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
