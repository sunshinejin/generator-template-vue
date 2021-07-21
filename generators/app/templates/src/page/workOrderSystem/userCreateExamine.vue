<!-- 服务创建审核 -->
<template>
<div class='serCreateExamine'>
    <basePageHeader></basePageHeader>

    <div class="mainContent">
      <div class="searchColumn flex pdbt20">

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
        <el-table-column type="index" :index="indexMethod" label="序号"> </el-table-column>
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
        <el-table-column prop="catName" label="临控类别" sortable>
        </el-table-column>
        <el-table-column label="操作" >
        <template slot-scope="scope">
            <a class="opt c-blue" @click="seeDetail(scope.row)">
                审核
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

    <!-- 审核详情 -->

     <examineDetail :visible.sync = "detaildialog"   :rowData="examineDetail" @success="init"></examineDetail>

</div>
</template>

<script>
// import 《组件名称》 from '《组件路径》';
import { initCommonData } from '@/mixins/crud.js'
import serviceUrl from '../../api/config/serviceUrl.js'
const examineDetail = () => import(/* webpackChunkName: "examineDetail" */'./examineDetail.vue')

export default {
// import引入的组件需要注入到对象中才能使用
  components: {

    examineDetail

  },
  mixins: [initCommonData],
  data () {
    // 这里存放数据
    return {
      loading: false,
      detaildialog: false,
      userName: '',
      idcard: '',
      examineDetail: {},
      data: [

      ]
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
      // this.url = 'examine/examineList'
      this.url = 'user/queryUserList'
      this.params.exampleStatus = 2
      this.serviceNameAddr = serviceUrl.usercontrolmanager
      return true
    },
    indexMethod (index) {
      return index + 1
    },

    seeDetail (rowData) {
      this.examineDetail = rowData
      this.detaildialog = true
    },
    closeModel () {
      this.detaildialog = false
    }

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.init()

    this.$watch('userName', this.$debounce((newSearchName) => {
      console.log('newSearchName', newSearchName)
      if (newSearchName) {
        this.query.userName = newSearchName
      } else {
        this.query = {}
      }
      this.query.pageNum = 1
      this.init()
    }, 1000))

    this.$watch('idcard', this.$debounce((newSearchName) => {
      console.log('newSearchName', newSearchName)
      if (newSearchName) {
        this.query.idcard = newSearchName
      } else {
        this.query = {}
      }
      this.query.pageNum = 1
      this.init()
    }, 1000))
  }

}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.label{
    color: #666;
    width: 80px;
}

</style>
