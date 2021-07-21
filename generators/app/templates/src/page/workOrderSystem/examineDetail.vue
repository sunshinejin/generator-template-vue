<!-- 服务详情页面 -->
<template>
  <el-dialog
    title="审核详情"
    :visible.sync="visible"
    v-if="visible"
    width="40%"
    class="serviceDialog"
    v-loading.fullscreen="loading"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="beforeModalClose"
  >
    <div class="maincontent">
      <el-form>
        <el-form-item label="姓名" prop="userName">
          <div>{{ rowDataObj.userName }}</div>
        </el-form-item>

        <el-form-item label="性别" prop="gender">
          <div>{{ rowDataObj.gender === 1 ? '男' : '女' }}</div>
        </el-form-item>

        <el-form-item label="身份证号" prop="idcard">
          <div>{{ rowDataObj.idcard }}</div>
        </el-form-item>

        <el-form-item label="手机号" prop="homePhone">
          <div>{{ rowDataObj.homePhone }}</div>
        </el-form-item>

        <el-form-item label="年龄" prop="age">
          <div>{{ rowDataObj.age }}</div>
        </el-form-item>

        <el-form-item label="住址" prop="address">
          {{ rowDataObj.address}}
        </el-form-item>

        <el-form-item label="籍贯" prop="nativePlace">
          {{ rowDataObj.nativePlace}}
        </el-form-item>
         <el-form-item label="临控类别" prop="catName">
          {{ rowDataObj.catName}}
        </el-form-item>

      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="saveData('3')" type="primary">通过</el-button>
      <el-button @click="saveData('4')" type="primary">不通过</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import 《组件名称》 from '《组件路径》';
import { dialog } from '@/mixins/dialog.js'

export default {
  name: 'rowDataObj',
  mixins: [dialog],
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {

    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {

    saveData (type) {
      this.loading = true
      this.$api.examine.userExamine(
        {
          data: {...this.rowDataObj, exampleStatus: parseInt(type)}
        }
      ).then(() => {
        this.loading = false
        this.$emit('success')
        this.submitSuccessNotify()

        this.cancel()
      }).catch(() => {
        this.loading = false
      })
    },

    reject (row) {
      this.loading = true

      this.$api.examine.userExamine({
        data: {...this.rowDataObj, exampleStatus: 4}
      }).then((res) => {
        this.loading = false
        this.submitSuccessNotify()
        this.emit('success')
        this.cancel()
      }).catch(() => {
        this.loading = false
      })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // this.rowDataObj = this.userData
  }

}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

.serviceDialog /deep/ .el-form-item__label {
  float: none;
}

.serviceDialog /deep/ .el-form-item {
  text-align: left;
  margin-bottom: 15px;
}

.serviceDialog /deep/ .el-form-item__content {
  color: #0d0d23;
}

.serviceDialog /deep/ .el-dialog__footer {
  text-align: center;
}

.serviceDialog {
  .maincontent {
    align-items: flex-start;
  }

  .leftForm {
    margin-right: 80px;
    width: 45%;
  }
}

.rightForm {
  .left {
    background-color: #d8d8d8;
    width: 90px;
    height: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .item {
    height: 32px;
    line-height: 32px;
  }

  .table {
    display: flex;
    align-items: flex-start;
  }

  .right {
    box-sizing: border-box;
    width: 420px;
    border-right: 1px solid #d8d8d8;

    .item {
      display: flex;
      border-top: 1px solid #d8d8d8;
      border-bottom: 1px solid #d8d8d8;
      justify-content: space-around;
      div {
        width: 33%;
        padding-left: 10px;
      }
    }

    .borderBottomNone {
      border-bottom: none;
    }
  }

  .portMode {
    .item {
      margin-right: 30px;
    }
  }
}

.serviceDialog /deep/ .el-form-item__label {
  float: none;
}

.serviceDialog /deep/ .el-form-item {
  text-align-last: left;
}

.serviceDialog /deep/ .el-form-item__content {
  color: #0d0d23;
}

.serviceDialog /deep/ .el-dialog__footer {
  text-align: center;
}

.serviceDialog {
  .leftForm {
    margin-right: 80px;
  }
}
</style>
