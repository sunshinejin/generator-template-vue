
import {crudMethod} from '@/api/crudMethod.js'

export const initCommonData = {

  data () {
    return {
      // 表格数据
      data: [],
      // 排序规则，默认 id 降序， 支持多字段排序 ['id,desc', 'createTime,asc']
      sort: ['id,desc'],
      // 页码
      pageNum: 1,
      // 每页数据条数
      pageSize: 10,
      // 总数据条数
      total: 0,
      // 请求数据的table的url
      url: '',
      // 查询数据的参数
      params: {},
      // 待查询的对象
      query: {},
      // 等待时间
      time: 500,
      // 是否为新增类型的表单
      isAdd: false,
      // 服务名称
      serviceNameAddr: '',
      // 导出的 Loading
      downloadLoading: false,
      // 表格 Loading 属性
      loading: true,
      // 删除 Loading 属性
      delLoading: false,
      delAllLoading: false,
      // 弹窗属性
      dialog: false,
      // Form 表单
      form: {},
      // 重置表单
      resetForm: {},
      // 标题
      title: '',

      // 删除是否需要提交审核
      isDelToExamine: false,

      defaultProps: {
        children: 'nodes',
        label: 'deptName',
        isLeaf: 'isLeaf'
      }
    }
  },
  methods: {
    async init () {
      if (!await this.beforeInit()) {
        return
      }
      return new Promise((resolve, reject) => {
        this.loading = true

        // 请求数据
        crudMethod.initData({url: this.url, serviceNameAddr: this.serviceNameAddr, data: this.getQueryParame()}).then(res => {
          console.log('res', res)

          // time 毫秒后显示表格
          setTimeout(() => {
            this.loading = false
            this.total = res.data.total ? res.data.total : 0
            this.data = res.data.results || res.data.list || []
          }, this.time)

          resolve(res.data.results)
        }).catch(err => {
          this.loading = false
          reject(err)
        })
      })
    },
    // //   懒加载时触发
    // async loadNode (node, resolve) {
    //   await this.getChildrenNode(node, resolve)
    // },
    // getChildrenNode (node, resolve) {
    //   if (node.level !== 0) { // 非根节点
    //     this.parentId = node.data.id
    //   }

    //   this.this.crudMethod.initData({parentId: this.parentId, updateId: '1'}).then(res => {
    //     this.deptData = res.data
    //     if (this.deptData.length === 0) {
    //       this.$message.error('数据拉取失败，请刷新再试！')
    //       return
    //     }

    //     // 标志是否为叶子节点
    //     for (let item of this.deptData) {
    //       this.$set(item, 'isLeaf', !!item.isLeaf)
    //     }

    //     resolve(this.deptData)

    //     if (node.level === 0) {
    //       // 触发节点初次点击
    //       this.$nextTick().then(() => {
    //         const firstNode = document.querySelector('.el-tree-node')
    //         firstNode.click()
    //       })
    //     }
    //   })
    // },

    beforeInit () {
      return true
    },
    getQueryParame: function () {
      return {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        ...this.query,
        ...this.params
      }
    },
    pageChange (e) {
      this.pageNum = e - 1
      this.init()
    },
    sizeChange (e) {
      this.pageNum = 0
      this.pageSize = e
      this.init()
    },
    // 预防删除第二页最后一条数据时，或者多选删除第二页的数据时，页码错误导致请求无数据
    dleChangePage (size) {
      if (size === undefined) {
        size = 1
      }
      if (this.data.length === size && this.pageNum !== 0) {
        this.pageNum = this.pageNum - 1
      }
    },
    // 查询方法
    toQuery () {
      this.pageNum = 0
      this.init()
    },

    /**
     * 通用的提示封装
     */
    submitSuccessNotify () {
      this.$notify({
        title: '提交成功',
        type: 'success',
        duration: 2500
      })
    },

    submitCreateExamine () {
      this.$notify({
        title: '提交至服务创建审核成功',
        type: 'success',
        duration: 2500
      })
    },

    submitMultipleExamine () {
      this.$notify({
        title: '提交至服务综合审核成功',
        type: 'success',
        duration: 2500
      })
    },

    addSuccessNotify () {
      this.$notify({
        title: '新增成功',
        type: 'success',
        duration: 2500
      })
    },
    editSuccessNotify () {
      this.$notify({
        title: '编辑成功',
        type: 'success',
        duration: 2500
      })
    },
    delSuccessNotify () {
      this.$notify({
        title: '删除成功',
        type: 'success',
        duration: 2500
      })
    },
    notify (title, type) {
      this.$notify({
        title,
        type,
        duration: 2500
      })
    },

    /**
     * 删除前可以调用beforeDelMethod做一些操作，比如获取id值等
     */
    beforeDelMethod () {
      return true
    },

    /**
     * 通用的删除
     */
    delMethod (params) {
      console.log('params', params)
      if (!this.beforeDelMethod()) {
        return
      }

      this.$confirm('你确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delLoading = true
        crudMethod.del({url: this.url, serviceNameAddr: this.serviceNameAddr, data: params}).then(() => {
          this.delLoading = false
          //  this.$refs[id].doClose()
          this.dleChangePage()
          if (this.isDelToExamine) {
            this.notify('已提交审核', 'success')
          } else {
            this.delSuccessNotify()
          }

          this.afterDelMethod()
          this.init()
        }).catch(() => {
          this.delLoading = false
          // this.$refs[id].doClose()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    afterDelMethod () {},

    /**
     * 多选删除提示
     */
    beforeDelAllMethod () {

    },
    /**
     * 多选删除
     */
    delAllMethod (idName, submitIdName) {
      if (!this.beforeDelAllMethod()) {
        return
      }

      this.$confirm('你确定删除选中的数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delAllLoading = true
        const data = this.$refs.table.selection
        const ids = []
        for (let i = 0; i < data.length; i++) {
          ids.push(data[i][idName])
        }
        crudMethod.delAll({url: this.url, serviceNameAddr: this.serviceNameAddr, data: {[submitIdName]: ids}}).then(() => {
          this.delAllLoading = false
          this.dleChangePage(ids.length)
          this.init()
          this.$notify({
            title: '删除成功',
            type: 'success',
            duration: 2500
          })
        }).catch(() => {
          this.delAllLoading = false
        })
      })
    },
    /**
     * 显示新增弹窗前可以调用该方法
     */
    beforeShowAddForm () {},
    /**
     * 显示新增弹窗
     */
    showAddFormDialog () {
      this.isAdd = true
      this.resetForm = JSON.parse(JSON.stringify(this.form))
      this.beforeShowAddForm()
      this.dialog = true
    },
    /**
     * 显示编辑弹窗前可以调用该方法
     */
    beforeShowEditForm (data) {

    },
    /**
     * 显示编辑弹窗
     */
    showEditFormDialog (data = {}) {
      // if (!this.beforeShowEditForm(data)) {
      //   return
      // }
      this.isAdd = false
      this.dialog = true
      this.resetForm = JSON.parse(JSON.stringify(this.form))
      this.form = JSON.parse(JSON.stringify(data))
      console.log('this.form', this.form)
    },
    /**
     * 新增方法
     */
    addMethod () {
      crudMethod.add({url: this.url, serviceNameAddr: this.serviceNameAddr, data: this.form}).then(() => {
        this.addSuccessNotify()
        this.loading = false
        this.afterAddMethod()
        this.cancel()
        this.init()
        this.$emit('success')
      }).catch(() => {
        this.loading = false
        this.afterAddErrorMethod()
      })
    },
    /**
     * 新增后可以调用该方法
     */
    afterAddMethod () {},
    /**
     * 新增失败后调用该方法
     */
    afterAddErrorMethod () {},
    /**
     * 通用的编辑方法
     */
    editMethod () {
      crudMethod.edit({url: this.url, serviceNameAddr: this.serviceNameAddr, data: this.form}).then(() => {
        this.editSuccessNotify()
        this.loading = false
        this.afterEditMethod()
        this.cancel()
        this.init()
        this.$emit('success')
      }).catch(() => {
        this.loading = false
      })
    },
    /**
     * 编辑后可以调用该方法
     */
    afterEditMethod () {},
    /**
     * 提交前可以调用该方法
     */
    beforeSubmitMethod () {
      return true
    },
    /**
     * 提交
     */
    submitMethod () {
      if (!this.beforeSubmitMethod()) {
        return
      }
      if (this.$refs['form']) {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true
            if (this.isAdd) {
              this.addMethod()
            } else this.editMethod()
          }
        })
      }
    },
    /**
     * 隐藏弹窗
     */
    cancel () {
      this.dialog = false
      if (this.$refs['form']) {
        this.$refs['form'].clearValidate()
        this.$refs['form'].resetFields()
        this.form = this.resetForm
      }
    },
    /**
     * 点击叉号关闭弹窗
     */
    beforeModalClose () {
      this.dialog = false
    },

    /**
     * 获取弹窗的标题
     */
    getFormTitle () {
      return this.isAdd ? `新增${this.title}` : `编辑${this.title}`
    },
    /**
     * 通用导出
     */
    downloadMethod () {
      this.beforeInit()
      this.downloadLoading = true
      download(this.url + '/download', this.params).then(result => {
        this.downloadFile(result, this.title + '数据', 'xlsx')
        this.downloadLoading = false
      }).catch(() => {
        this.downloadLoading = false
      })
    },

    // 日期搜索

    changeDate () {
      if (this.dateValue) {
        this.query.start_time = new Date(this.dateValue[0]).getTime()
        this.query.end_time = new Date(this.dateValue[1]).getTime()
      } else {
        this.query.start_time = 0
        this.query.end_time = 0
      }

      this.init()
    }

  }
}
