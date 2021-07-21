export const dialog = {

  props: {

    visible: {
      type: Boolean,
      default: false
    },

    rowData: {
      type: Object
    }

  },

  computed: {

    rowDataObj () {
      return JSON.parse(JSON.stringify(this.rowData))
    }
  },

  data () {
    return {
      loading: false
    }
  },

  methods: {

    beforeModalClose () {
      this.cancel()
    },

    cancel () {
      this.$emit('update:visible', false)

      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }

      if (this.$refs['form']) {
        this.$refs['form'].clearValidate()

        this.$refs['form'].resetFields()
      }
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

    submitCreateExamine () {
      this.$notify({
        title: '已提交审核',
        type: 'success',
        duration: 2500
      })
    },

    submitMultipleExamine () {
      this.$notify({
        title: '已提交审核',
        type: 'success',
        duration: 2500
      })
    }

  }

}
