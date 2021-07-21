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
          >新增</el-button
        >
        <el-button v-if="$store.state.user.type === 1" type="primary" size="small" class="mr30" @click="editDialog"
          >编辑</el-button
        >
        <el-button
          type="primary"
          size="small"
          class="mr30"
          v-if="$store.state.user.type === 1"
          @click="delAllMethod('userId', 'userIds')"
          >删除</el-button
        >

        <el-input
          type="text"
          suffix-icon="el-icon-search"
          class="searchInput mr30"
          v-model.trim="userName"
          placeholder="搜索姓名"
        />

        <el-input
          type="text"
          suffix-icon="el-icon-search"
          class="searchInput"
          v-model.trim="idcard"
          placeholder="搜索身份证号"
        />
      </div>

      <!-- 表格 -->

      <el-table :data="data" ref="table" v-loading="loading">
        <el-table-column type="selection" width="55"  v-if="$store.state.user.type === 1"> </el-table-column>
        <el-table-column type="index" :index="indexMethod" label="序号">
        </el-table-column>
        <el-table-column prop="userName" label="姓名" sortable>
        </el-table-column>

        <el-table-column prop="gender" label="性别" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.gender == 1 ? "男" : "女" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="idcard" label="身份证号"> </el-table-column>
        <el-table-column prop="homePhone" label="手机号"> </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="address" label="住址"> </el-table-column>
        <el-table-column prop="nativePlace" label="籍贯"> </el-table-column>
        <el-table-column prop="exampleStatus" label="审核状态">
          <template slot-scope="scope">
            <div
              :class="{
                colorGreen: scope.row.exampleStatus === 3,
                colorRed: scope.row.exampleStatus === 4,
              }"
            >
              {{ exampleStatus[scope.row.exampleStatus] }}
            </div>
            <div></div>
          </template>
        </el-table-column>
        <el-table-column prop="catName" label="临控类别" sortable>
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
      width="40%"
      v-loading="loading"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="modalClose"
    >
      <div>
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="form.userName"></el-input>
          </el-form-item>

          <el-form-item label="性别" prop="gender">
            <el-select v-model="form.gender">
              <el-option
                v-for="item in genderOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号" prop="homePhone">
            <el-input v-model.number="form.homePhone"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="form.age"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="idcard">
            <el-input v-model.number="form.idcard"></el-input>
          </el-form-item>
          <el-form-item label="住址">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="籍贯">
            <el-input v-model="form.nativePlace"></el-input>
          </el-form-item>
          <el-form-item label="临控类别" prop="catId">
            <el-select v-model="form.catId" @change="handelCatChange">
              <el-option
                v-for="item in catNameOptions"
                :key="item.catId"
                :label="item.catName"
                :value="item.catId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitMethod">{{
          isAdd ? "提交审核" : "确认修改"
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import 《组件名称》 from '《组件路径》';
import { initCommonData } from '@/mixins/crud.js'
import serviceUrl from '../../api/config/serviceUrl.js'
// `exampleStatus` int(6) DEFAULT NULL COMMENT '审核状态  0:未提交审核  1:已提交审核  2:审核中  3:审核通过  4:审核不通过',
export default {
  name: 'Accout',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  mixins: [initCommonData],
  data () {
    // 这里存放数据
    return {
      loading: false,
      userName: '',
      idcard: '',
      // 要调接口
      catNameOptions: [

      ],
      form: {
        userName: '',
        gender: '',
        homePhone: '',
        idcard: '',
        age: '',
        address: '',
        nativePlace: '',
        catId: 0,
        catName: '',
        exampleStatus: 0
      },
      genderOptions: [
        {
          label: '男',
          value: 1
        },
        {
          label: '女',
          value: 2
        }
      ],

      exampleStatus: {
        0: '未提交审核',
        1: '已提交审核',
        2: '审核中',
        3: '审核通过',
        4: '审核不通过'
      },

      data: [

      ],
      rules: {

        userName: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' }
        ],

        gender: [
          { required: true, message: '请输入性别', trigger: 'blur' }
        ],
        homePhone: [
          { validator: this.$validateTel, trigger: 'blur' }
        ],
        age: [
          { validator: this.$checkNumber, trigger: 'blur' }
        ],
        idcard: [
          { required: true, message: '请输入身份证号码', trigger: 'blur' },

          { validator: this.$checkIdNum, trigger: 'blur' }
        ],
        catId: [
          { required: true, message: '请选择临控类型', trigger: 'change' }
        ]
      }
    }
  },
  // 监听属性 类似于data概念
  computed: {

  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    beforeInit () {
      this.url = 'user/queryUserList'

      this.serviceNameAddr = serviceUrl.usercontrolmanager

      return true
    },
    indexMethod (index) {
      return index + 1
    },
    beforeShowEditForm (data) {
      console.log('data++++++++++', data)
      if (data.length === 0) {
        this.notify('请勾选复选框选择一条数据', 'warning')
        return false
      } else if (data.length && data.length > 1) {
        this.notify('只能选择一条数据进行编辑', 'warning')
        return false
      } else {
        this.title = '编辑用户'
        this.url = 'user/updateUser'
        return true
      }
    },
    async editDialog () {
      const data = this.$refs.table.selection
      console.log('data==>', data)

      if (!this.beforeShowEditForm(data)) return

      // // 获取临控列表数据，pageSize传1000
      this.catNameOptions = await this.queryCatList()
      console.log('this.catNameOptions', this.catNameOptions)

      this.showEditFormDialog(data[0])
    },
    handelCatChange (e) {
      console.log('e', e)
      const typeArray = this.catNameOptions.filter((item) => {
        return item.catId === e
      })

      this.form.catName = typeArray[0].catName
    },
    queryCatList () {
      this.loading = true
      return new Promise((resolve, reject) => {
        this.$api.userCat.queryCatList(
          {
            data: {
              pageNum: 1,
              pageSize: 1000
            }
          }
        ).then((res) => {
          this.loading = false
          resolve(res.data.results)
        }).catch(() => {
          this.loading = false
        })
      })
    },

    async beforeShowAddForm (data) {
      this.form = {}

      this.title = '新增用户'

      this.url = 'user/saveUser'

      // // 获取临控列表数据，pageSize传1000
      this.catNameOptions = await this.queryCatList()
      console.log('this.catNameOptions', this.catNameOptions)
    },

    beforeDelAllMethod () {
      const datas = this.$refs.table.selection
      if (datas.length === 0) {
        this.notify('请勾选数据后进行删除操作', 'warning')
        return
      }

      this.url = 'user/removeUserAll'

      return true
    },

    modalClose () {
      this.dialog = false
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.init()
    // this.catNameOptions = this.queryCatList()
    this.$watch(
      'userName',
      this.$debounce((newUserName) => {
        console.log('newUserName', newUserName)
        if (newUserName) {
          this.query.userName = newUserName
        } else {
          this.query = {}
        }
        this.query.pageNum = 1
        this.init()
      }, 1000)
    )

    this.$watch(
      'idcard',
      this.$debounce((newIdcard) => {
        console.log('newIdcard', newIdcard)
        if (newIdcard) {
          this.query.idcard = newIdcard
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

  .colorGreen {
    color: #409eff;
  }

  .colorRed {
    color: #ee1e1e;
  }
}
</style>
