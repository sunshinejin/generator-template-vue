<!-- 搜索栏统一封装 -->
<template>
<div class="search-form-box">
    <el-form
        :model="formData"
        ref="formRef"
        :inline="true" >
        <el-form-item
            v-for="(item, index) in formOptions"
            :key="newKeys[index]"
            :prop="item.prop"
            :label="item.label ? (item.label + '：') : ''"
            :rules="item.rules"
        >
          <formItem
            v-model="formData[item.prop]"
            :itemOptions="item"
          />
        </el-form-item>

    </el-form>

  <!-- 提交按钮 -->

  <div class="btn-box">

      <el-button
            v-if="btnItems.includes('search')"
            size="mini"
            type="primary"
            class="btn-search"
            @click="onSearch"
        >搜索</el-button>

      <el-button
          v-if="btnItems.includes('add')"
          size="mini"
          type="primary"
          class="btn-add"
          @click="onAdd"
        >新增</el-button>

        <el-button
          v-if="btnItems.includes('export')"
          size="mini"
          type="primary"
          class="btn-export"
          @click="onExport"
        >导出</el-button>

  </div>

</div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import FormItem from './FormItem'

export default {
//import引入的组件需要注入到对象中才能使用
components: {
    FormItem
},
props: {
     formOptions:{
        type: Array,
        required: true,
        default () {
            return []
        }
     },
    //  提交按钮项，多个用逗号分隔（search, export, reset）
     btnItems: {
       type:String,
       default (){
         return 'search'
       }
     }
},
data() {
//这里存放数据
return {
    formData:{}
};
},
//监听属性 类似于data概念
computed: {
  newKeys () {
    return this.formOptions.map(()=>{

        return this.$createUniqueString()
        
    })
  }
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  // 校验
  onValidate (callback) {

    this.$refs.formRef.validate((valid)=>{
        if (valid) {
          console.log("提交成功")
          console.log("formData",this.formData)
          callback()
        }
    })

  },

  // 添加初始值
    addInitValue () {
        const obj = {}
        this.formOptions.forEach(v => {
            if (v.initValue !== undefined) {
            obj[v.prop] = v.initValue
            }
        })
        this.formData = obj
    },

    // 导出
    onExport () {
      this.onValidate(() => {
        this.$emit('onExport', this.formData)
      })
    },

    // 搜索
    onSearch (){

      this.onValidate(()=>{

        this.$emit('onSearch',this.formData)

      })

    }

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    
    this.addInitValue()
   
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang='less' scoped>

.search-form-box {

  display: flex;
  margin-bottom: 15px;

  .btn-box {
    padding-top: 5px;
    display: flex;

    button {
      height: 28px;
    }
  }
  .el-form {
    /deep/ .el-form-item__label {
      padding-right: 0;
      color: #8c8c8c;
      margin-right: 10px;
    }
    .el-form-item {
      margin-bottom: 0;
      margin-right: 20px;
      &.is-error {
        margin-bottom: 22px;
      }
    }
    // el-input宽度
    /deep/ .form-item {
      > .el-input:not(.el-date-editor) {
        width: 120px;
      }
    }
    /deep/ .el-select {
      width: 120px;
    }
   
  }
}


</style>