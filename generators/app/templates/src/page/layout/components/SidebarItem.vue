<template>
  <el-row>
      <el-col >

   

         <template >

            <el-menu

            class="el-menu-main"
            background-color="#fff"
            text-color="#333"
            active-text-color="#4c7cff"
            :unique-opened ="true"
            :default-active = "$route.path"
            router
            >

               <!-- <router-link :to="{name: 'AdminIndex'}">

                  <el-menu-item index="/adminIndex" class="bgBlack">
                     <span class="iconfont">&#xe624;</span>
                     <span slot="title">概览</span>
                  </el-menu-item>

                </router-link>
            

               <el-submenu index='2' >

                  <template slot="title">
                     <span class="iconfont">&#xe638;</span>
                     <span>镜像仓库</span>
                  </template>

                  <router-link :to="{name: 'project'}">
                        <el-menu-item index="/project" >项目</el-menu-item>
                  </router-link>

               </el-submenu> -->

               

            </el-menu>

         </template>

   

      </el-col>

  </el-row>
</template>

<script>
export default {
  name: '',
  components: {
  },
  props: {
  },
  data () {
    return {
      userType: parseInt(this.$store.state.user.privilege)
    }
  },
  methods: {
  },
  computed: {

  },
  created(){
     console.log('$route.path',this.$route.path)
  }
}
</script>

<style lang='less' scoped>

   .el-row,
   .el-col,
   .el-menu{
      height:100%
   }
  

   // .el-menu-main /deep/ .el-submenu__title{
   //    color: #c0c4cc!important;
   // }
  .el-container{

       .el-aside{

          width: 238px;
          text-align: left;

      .el-menu{
         border-right-width: 0;

         .iconfont{
            color: #999;
            margin-right: 10px;
         }

         .el-menu-item{
             color: #333!important;
            // color: #fff!important;
            height: 50px;
            line-height: 50px;
            background-color: #fff!important;
           padding-left: 60px!important;
            font-size: 14px!important;
         }

         /deep/ .el-submenu__title{
            padding-left: 20px!important;
         }

         .el-menu-item.is-active{
            background-color: #f1f5ff!important;
            color: #4c7cff!important;
            .iconfont{
               color: #4c7cff!important;
            }
         }

         .is-opened{
           /deep/ .el-submenu__title{
               color:#4c7cff!important;

               /deep/ .el-submenu__icon-arrow{
                   color: #4c7cff!important;
               }

               .iconfont{
                  color: #4c7cff;
               }
            }
         }

         .bgBlack{
               background-color: #fff!important;
               padding-left: 20px !important;
         }

      }

     }

  }
</style>
