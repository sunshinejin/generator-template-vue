<!--  -->
<template>
<div class='basePageHeader'>
   <div class="title">
        {{pageTitle}}
   </div>

   <slot></slot>

</div>
</template>

<script>
// import 《组件名称》 from '《组件路径》';

export default {
// import引入的组件需要注入到对象中才能使用
  components: {

  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    // 这里存放数据
    return {
      pageTitle: ''
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    //   优先使用路由里边配置的标题否则就用页面内自定义的标题
    if (this.$route.meta.title) {
      this.pageTitle = this.$route.meta.title
    } else {
      this.pageTitle = this.title
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
  },
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
@import "../assets/less/common.less";

.basePageHeader{

    padding: 13px 20px;
    height: 50px;
    line-height: 58px;
    font-size:24px;
    display: flex;
    align-items: center;
    color:#0D0D23;
    background-color: #fff;

    .title{
        height: 24px;
        line-height: 24px;
        border-left: 3px solid  @lightBlue;
        text-align: left;
        padding-left: 10px;
    }

}

</style>
