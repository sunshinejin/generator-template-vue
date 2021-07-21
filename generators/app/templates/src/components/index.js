// 页面的标题全局注册
import BasePageHeader from './BasePageHeader.vue'
import iBreadCrumb from './BaseBreadCrumb.vue'
import BasePagination from './BasePagination.vue'
import SearchForm from './SearchForm.vue'
import Vue from 'vue'

// 页面标题
Vue.component(
    
  'BasePageHeader',BasePageHeader


)

// 页面面包屑导航
Vue.component(
    
    'BaseBreadCrumb',iBreadCrumb
  
  )

  // 分页
Vue.component(
  
  'BasePagination',BasePagination

)

// 搜索栏
Vue.component(
  'SearchForm',SearchForm
)


  // 全局指令 v-permission 控制菜单显示隐藏

  Vue.directive('permission', {
    bind: function (el, binding, vnode) {

      if(binding.arg !== binding.value ){

        el.style.display = "none"

      }
    }
  })
  
  

