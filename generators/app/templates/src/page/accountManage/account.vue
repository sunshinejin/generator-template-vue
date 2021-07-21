<!-- 账户管理 -->
<template>
  <div class="accountManage">
    <basePageHeader></basePageHeader>

    <div class="mainContent">
      <div class="searchColumn flex pdbt20">
        <el-button
          type="primary"
          size="small"
          class="mr30"
          @click="showAddFormDialog"
          >创建账户</el-button
        >

        <!-- <el-input
          type="text"
          suffix-icon="el-icon-search"
          class="searchInput mr30"
          v-model.trim="searchAccount"
          placeholder="搜索用户账号"
        /> -->

        <el-input
          type="text"
          suffix-icon="el-icon-search"
          class="searchInput"
          v-model.trim="userName"
          placeholder="搜索用户名称"
        />
      </div>

      <!-- 表格 -->

      <el-table :data="data" v-loading="loading">
        <el-table-column prop="userRemark" label="单位名称" sortable>
        </el-table-column>

        <el-table-column prop="userName" label="用户名称" sortable>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a class="opt c-blue edit" @click="showEditFormDialog(scope.row)">
              编辑
            </a>

            <a class="opt c-blue edit" @click="updatePassWord(scope.row)">
              修改密码
            </a>
            <a
              size="mini"
              :ref="scope.row.user_id"
              class="opt del"
              @click="delMethod({ userIds: [scope.row.userId ]})"
            >
              删除
            </a>
          </template>
        </el-table-column>
      </el-table>

      <BasePagination
        :total="total"
        @pageChange="pageChange"
        @sizeChange="sizeChange"
      ></BasePagination>
    </div>

    <el-dialog
      :title="title"
      :visible.sync="dialog"
      v-if="dialog"
      width="33%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="modalClose"
    >
      <el-form :model="form" :rules="rules" ref="form">

        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>

        <el-form-item label="单位名称" prop="userRemark">
          <el-input v-model="form.userRemark"></el-input>
        </el-form-item>

        <el-form-item label="账号密码" prop="userPwd" v-if="this.isAdd">
          <el-input v-model="form.userPwd" show-password></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitMethod">{{
          isAdd ? "创建" : "确认修改"
        }}</el-button>
      </span>
    </el-dialog>

    <!-- 修改密码 -->
    <UpdatePassword
      :is-visibility="updatePasswordVisible"
      @closeChild="closeDialog"
      @savePassword="getPassword"
    ></UpdatePassword>
  </div>
</template>

<script>
// import 《组件名称》 from '《组件路径》';
import { initCommonData } from '@/mixins/crud.js'
import serviceUrl from '../../api/config/serviceUrl.js'
import md5 from 'blueimp-md5'
export default {
  name: 'Accout',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  mixins: [initCommonData],
  data () {
    // 这里存放数据
    return {
      value: '',
      searchName: '',
      userName: '',
      loading: false,
      updatePasswordVisible: false,
      data: [

      ],
      form: {
        userRemark: '',
        userName: '',
        userPwd: ''
      },
      rules: {

        userRemark: [
          { required: true, message: '请输入单位名称', trigger: 'blur' }
        ],

        userName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        userPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: this.$checkPassword, trigger: 'blur' }
        ]
      }
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    beforeInit () {
      this.url = 'pageList'

      this.serviceNameAddr = serviceUrl.sysUserAction

      return true
    },

    submitMethod () {
      if (!this.beforeSubmitMethod()) {
        return
      }
      if (this.$refs['form']) {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true
            if (this.isAdd) {
              this.form.userPwd = md5(this.form.userPwd)
              this.addMethod()
            } else this.editMethod()
          }
        })
      }
    },
    beforeShowEditForm (data) {
      this.title = '编辑账户'

      this.url = 'save'
    },

    beforeShowAddForm (data) {
      this.form = {}

      this.title = '创建账户'

      this.url = 'save'
    },

    getQueryParame: function () {
      return {
        page: this.pageNum,
        rows: this.pageSize,
        ...this.query,
        ...this.params
      }
    },

    beforeDelMethod () {
      this.url = 'remove'
      return true
    },

    modalClose () {
      this.dialog = false
    },
    updatePassWord (data) {
      this.form = JSON.parse(JSON.stringify(data))
      this.updatePasswordVisible = true
    },
    closeDialog () {
      this.updatePasswordVisible = false
    },
    getPassword (obj) {
      // this.form.userPwd = obj.password
      console.log('obj+++++++', obj)
      // 掉接口，关闭弹窗
      this.$api.accountManage.resetPwd({
        data: {
          userId: this.form.userId,
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
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.init()

    this.$watch(
      'userName',
      this.$debounce((newSearchAccount) => {
        if (newSearchAccount) {
          this.query.userName = newSearchAccount
        } else {
          this.query = {}
        }
        this.query.pageNum = 1
        this.init()
      }, 1000)
    )
  }
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

.accountManage {
  .opt {
    display: inline-block;
    min-width: 60px;
    text-align: left;
    &:hover {
      cursor: pointer;
    }
  }
  .edit {
    &:hover {
      color: #4285f4;
    }
  }
  .del {
    color: #ee1e1e;
    text-align: right;
  }

  .el-input__prefix,
  .el-input__suffix {
    top: -2px;
  }
}
</style>
