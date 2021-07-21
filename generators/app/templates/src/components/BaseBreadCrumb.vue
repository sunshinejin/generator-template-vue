<!--  -->
<template>

   <div class="reback">
     <i class="el-icon-arrow-left"></i>
       <router-link :to="{ path: pathName }"><slot></slot></router-link>
   </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
props:['pathName'],
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>

    .reback{
        border-radius: 1.5px;
        border: 1px solid #e4e7ed;
        width: 130px;
        height: 23px;
        margin-left: 20px;
        display: flex;
        align-items: center;
        justify-content: center;

        .el-icon-arrow-left{
            font-size: 16px;
        }

        a{
                color:#666;
                font-size:14px;
        }

        &:hover{
            border: 1px solid #3a8ee6;
        }
    }

</style>