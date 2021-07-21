<!-- 分页组件 -->
<template>
<div class='myPagination'>
     <el-pagination
        layout="prev, pager, next,sizes,jumper"
        :total="total"
        :page-size="pageSize"
        :page-sizes="pageSizes"
         background
        :hide-on-single-page="hideOnSinglePage"
        @size-change = "changeSize"
        @current-change = "pageChange">
      </el-pagination>

</div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
props:{
    total:{
        type: Number,
        default: 0
    },
    pageSize:{
        type: Number,
        default: 10
    },
    pageSizes:{
        type: Array,
        default(){
            return [10,20,30,40,50,100]
        }
    },
    hideOnSinglePage:{
        type: Boolean,
        default:true
    }
},
data() {
//这里存放数据
return {
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

    pageChange(pageNumber){
        this.$emit("pageChange",pageNumber)
    },

    changeSize(pageSize){
        console.log('pageSize',pageSize)
        this.$emit("sizeChange",pageSize)
    }

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
console.warn('total',this.total)
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

.myPagination{
    height: 36px;
}

</style>
