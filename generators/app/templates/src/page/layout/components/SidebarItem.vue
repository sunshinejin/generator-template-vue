<template>
  <div>
       <!-- 超级管理员账号 -->
      <template v-if="userType === 1">
        <el-menu
          class="el-menu-main"
          background-color="#fff"
          text-color="#333"
          active-text-color="#4c7cff"
          :unique-opened="true"
          :default-active="$route.path"
          router
        >
          <router-link :to="{ name: 'account' }">
            <el-menu-item index="/account" class="bgBlack">
              <span class="iconfont">&#xe627;</span>
              <span slot="title">账户管理</span>
            </el-menu-item>
          </router-link>

          <router-link :to="{ name: 'controlType' }">
            <el-menu-item index="/controlType" class="bgBlack">
              <span class="iconfont">&#xe624;</span>
              <span slot="title">临控类别</span>
            </el-menu-item>
          </router-link>

          <router-link :to="{ name: 'userManage' }">
            <el-menu-item index="/userManage" class="bgBlack">
              <span class="iconfont">&#xe639;</span>
              <span slot="title">人员管理</span>
            </el-menu-item>
          </router-link>

          <el-submenu index='4'>
            <template slot="title">
              <span class="iconfont">&#xe636;</span>
              <span>工单系统</span>
            </template>

            <router-link :to="{ name: 'userCreateExamine' }">
              <el-menu-item index="/userCreateExamine">用户审核</el-menu-item>
            </router-link>
          </el-submenu>
        </el-menu>
      </template>
      <!-- 普通账号 -->
      <template v-else>
        <el-menu
          class="el-menu-main"
          background-color="#fff"
          text-color="#333"
          active-text-color="#4c7cff"
          :unique-opened="true"
          :default-active="$route.path"
          router
        >

          <router-link :to="{ name: 'userManage' }">
            <el-menu-item index="/userManage" class="bgBlack">
              <span class="iconfont">&#xe639;</span>
              <span slot="title">人员管理</span>
            </el-menu-item>
          </router-link>

        </el-menu>
      </template>
   </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      userType: this.$store.state.user.type
    }
  },

  methods: {},

  mounted () {
  },
  computed: {},
  created () {

  }
}
</script>

<style lang='less' scoped>
.el-row,
.el-col,
.el-menu {
  height: 100%;
}

// .el-menu-main /deep/ .el-submenu__title{
//    color: #c0c4cc!important;
// }
.el-container {
  .el-aside {
    width: 238px;
    text-align: left;

    .el-menu {
      border-right-width: 0;

      .iconfont {
        color: #999;
        margin-right: 10px;
      }

      .el-menu-item {
        color: #333 !important;
        // color: #fff!important;
        height: 50px;
        line-height: 50px;
        background-color: #fff !important;
        padding-left: 60px !important;
        font-size: 14px !important;
      }

      /deep/ .el-submenu__title {
        padding-left: 20px !important;
      }

      .el-menu-item.is-active {
        background-color: #f1f5ff !important;
        color: #4c7cff !important;
        .iconfont {
          color: #4c7cff !important;
        }
      }

      .is-opened {
        /deep/ .el-submenu__title {
          color: #4c7cff !important;

          /deep/ .el-submenu__icon-arrow {
            color: #4c7cff !important;
          }

          .iconfont {
            color: #4c7cff;
          }
        }
      }

      .bgBlack {
        background-color: #fff !important;
        padding-left: 20px !important;
      }
    }
  }
}
</style>
