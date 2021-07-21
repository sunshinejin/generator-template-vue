<template>
   <el-container class="container-box">

        <el-header>

          <myheader/>
          
        </el-header>

        <el-container>

          <el-aside >
            <sidebarItem/>
          </el-aside>
          <el-main>
            <transition name="fade-transform" mode="out-in">
    
               <router-view :key="key" />

            </transition>
          </el-main>

       </el-container>
   </el-container>

</template>

<script>
// import Navbar from './components/NaveBar.vue'
import sidebarItem from './components/SidebarItem.vue'
import myheader from './components/Header.vue'
export default {
  name: '',
  components: {
    sidebarItem,
    myheader
  },
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
      key() {
        return this.$route.path
      }
  },
  methods: {
  }
}
</script>

<style lang='less' scoped>
    @deep: ~'>>>';

    .container-box{

        @{deep} .el-header{
           background-color:#001529;
           padding: 0;
       }

      @{deep} .el-aside{
        width: 238px!important;
        text-align: left;
      }

      @{deep} .el-main{
        width: 238px;
         background-color: #f2f2f2;
          padding: 0;
      }

     @{deep} .el-pagination{
        text-align: center;
      }

    }
  //  .el-container /deep/ .el-header{
  //     background-color:#001529;
  //   }

    //    @{deep} .el-aside{
    //       width: 238px;
    //        text-align: left;

    // .el-container /deep/ .el-main{
    //   background-color: #f2f2f2;
    // }

    // .el-container /deep/ .el-main{
    //       padding: 0;
    // }

    // .el-main /deep/ .el-pagination{
    //     text-align: center;
    // }

</style>
