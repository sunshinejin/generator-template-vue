<template>
  <el-dialog
     title="修改密码"
    :visible.sync="isVisibility"
    v-if="isVisibility"
    width="33%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="modalClose"
  >
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="新密码" prop="password">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="modalClose">取 消</el-button>
      <el-button type="primary" @click="submitMethod">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'updatePassword',
  props: {
    isVisibility: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        password: ''
      },
      rules: {
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { validator: this.$checkPassword, trigger: 'blur' }
        ]
      }
    }
  },
  create () {
    this.form.password = ''
  },
  methods: {
    modalClose () {
      this.$emit('closeChild')
    },
    submitMethod () {
      this.$emit('savePassword', this.form)
    }
  }

}
</script>
