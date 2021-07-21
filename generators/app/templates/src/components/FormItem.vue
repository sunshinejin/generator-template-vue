<!-- 表单选项 -->
<template>
<div class='form-item'>
    <el-input
        v-if="isInput"
        v-model="currentVal"
        v-bind="bindProps"
        v-on="bindEvents"
        size="mini"
    ></el-input>

    <el-select
        v-if="isSelect"
        v-model="currentVal"
        v-bind="bindProps"
        v-on="bindEvents"
        size="mini"
        clearable
    >
        <el-option
            v-for="item in itemOptions.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        ></el-option>
    </el-select>

    <!--  datetimerange/daterange -->

        <el-date-picker
            v-if="isDatePickerDateRange"
            v-model="currentVal"
            v-bind="bindProps"
            v-on="bindEvents"
            :type="itemOptions.type || 'datetimerange'"
            size="mini"
            clearable
          
            start-placeholder="开始日期"
            range-separator="至"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
            value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>

         <!-- monthrange -->
            <el-date-picker
            v-if="isDatePickerMonthRange"
            v-model="currentVal"
            v-bind="bindProps"
            v-on="bindEvents"
            type="monthrange"
            size="mini"
            clearable
            start-placeholder="开始日期"
            range-separator="至"
            end-placeholder="结束日期"
            value-format="yyyy-MM"
            ></el-date-picker>

             <!-- others -->
            <el-date-picker
                v-if="isDatePickerOthers"
                v-model="currentVal"
                v-bind="bindProps"
                v-on="bindEvents"
                :type="itemOptions.type"
                size="mini"
                clearable
                placeholder="请选择日期"
            ></el-date-picker>

</div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
props: {
    value:{},
    itemOptions: {
        type: Object,
        default (){
            return {}
        }
    }
},
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {
    // 双向绑定数据值
    currentVal: {
        get () {
            return this.value
        },
        set (val) {
            this.$emit('input',val)
        }
    },
    bindProps(){
        let obj = { ...this.itemOptions }
         // 移除已使用的或不相关的冗余属性
        delete obj.label
        delete obj.prop
        delete obj.element
        delete obj.initValue
        delete obj.rules
        delete obj.events
        if (obj.element === 'el-select') {
            delete obj.options
        }
        return obj
    },
    // 绑定方法
    bindEvents (){
        return this.itemOptions.events || {}
    },

     // el-input
    isInput () {
      return this.itemOptions.element === 'el-input'
    },
    // el-input-number
    isInputNumber () {
      return this.itemOptions.element === 'el-input-number'
    },
    // el-select
    isSelect () {
      return this.itemOptions.element === 'el-select'
    },
       // el-date-picker (type: datetimerange/daterange)
    isDatePickerDateRange () {
      const isDatePicker = this.itemOptions.element === 'el-date-picker'
      const isDateRange = !this.itemOptions.type ||
        this.itemOptions.type === 'datetimerange' ||
        this.itemOptions.type === 'daterange'
      return isDatePicker && isDateRange
    },

      // el-date-picker (type: monthrange)
    isDatePickerMonthRange () {
      const isDatePicker = this.itemOptions.element === 'el-date-picker'
      const isMonthRange = this.itemOptions.type === 'monthrange'
      return isDatePicker && isMonthRange
    },
    //  el-date-picker (type: other)
    isDatePickerOthers () {
      const isDatePicker = this.itemOptions.element === 'el-date-picker'
      return isDatePicker && !this.isDatePickerDateRange && !this.isDatePickerMonthRange
    }

},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

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
//@import url(); 引入公共css类

</style>