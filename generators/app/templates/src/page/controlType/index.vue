<!-- 账户管理 -->
<template>
  <div class="accountManage" v-loading="delLoading">
    <basePageHeader></basePageHeader>

    <div class="mainContent">
      <div class="searchColumn flex pdbt20">
        <el-button
          type="primary"
          size="small"
          class="mr30"
          @click="showAddFormDialog"
          >添加类别</el-button
        >

        <el-input
          type="text"
          suffix-icon="el-icon-search"
          class="searchInput"
          v-model.trim="catName"
          placeholder="搜索类别名称"
        />
      </div>

      <!-- 表格 -->

      <el-table :data="data" v-loading="loading">

        <el-table-column prop="catName" label="类别名称">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a class="opt c-blue edit" @click="showEditFormDialog(scope.row)">
              编辑
            </a>
            <a
              size="mini"
              :ref="scope.row.user_id"
              class="opt del"
              @click="delMethod({ catId: scope.row.catId })"
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
      v-loading="loading"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="modalClose"
    >

    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="类别名称" prop="catName">
        <el-input v-model="form.catName"></el-input>
      </el-form-item>

      <el-form-item label="类别代码" prop="codeName">
        <el-input v-model="form.codeName"></el-input>
      </el-form-item>

    </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitMethod">{{
          isAdd ? "创建" : "确认修改"
        }}</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
// import 《组件名称》 from '《组件路径》';
import { initCommonData } from '@/mixins/crud.js'
import serviceUrl from '../../api/config/serviceUrl.js'
export default {
  name: 'index',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  mixins: [initCommonData],
  data () {
    // 这里存放数据
    return {
      catName: '',
      loading: false,
      data: [

      ],
      form: {
        catName: '',
        codeName: '',
        catId: 0
      },
      rules: {
        catName: [
          { required: true, message: '请输入临控名称', trigger: 'blur' }
        ],
        codeName: [
          { required: true, message: '请输入临控代码', trigger: 'blur' }
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
      this.url = 'userCat/queryCatList'
      this.serviceNameAddr = serviceUrl.usercontrolmanager
      return true
    },

    beforeShowEditForm (data) {
      this.title = '编辑类别'

      this.url = '/userCat/updateCat'

      this.form.catName = data.catName

      this.form.codeName = data.codeName

      this.form.catId = data.catId
    },

    beforeShowAddForm (data) {
      this.form = {}

      this.title = '新增类别'

      this.url = '/userCat/saveCat'
    },

    beforeSubmitMethod () {
      return true
    },

    beforeDelMethod () {
      this.url = 'userCat/removeCat'
      return true
    },

    modalClose () {
      this.dialog = false
    },
    cancel () {
      this.dialog = false
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.init()

    this.$watch(
      'catName',
      this.$debounce((newValue) => {
        if (newValue) {
          this.query.catName = newValue
        } else {
          this.query = {}
        }
        this.query.pageNum = 1
        this.init()
      }, 1000)
    )

    this.$watch(
      'searchName',
      this.$debounce((newSearchName) => {
        console.log('newSearchName', newSearchName)
        if (newSearchName) {
          this.query.user_name = newSearchName
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
