const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  prompting () {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname
      }
    ])
    .then(answers => {
      console.log("answers",answers)
      this.answers = answers
    })
  }

  writing () {
    // 把每一个文件都通过模板转换到目标路径

    const templates = [
      '.babelrc',
      '.eslintignore',
      '.editorconfig',
      '.eslintrc.js',
      '.postcssrc.js',
      'package.json',
      'package-lock.json',
      'README.md',
      'index.html',
      'src/App.vue',
      'src/main.js',
      'src/api/config/api.js',
      'src/api/config/appIdSecretKey.js',
      'src/api/config/baseConfig.js',
      'src/api/config/getaWayUrl.js',
      'src/api/config/http.js',
      'src/api/config/serviceUrl.js',
      'src/api/account.js',
      'src/api/crudMethod.js',
      'src/api/examine.js',
      'src/api/login.js',
      'src/api/menu.js',
      'src/api/user.js',
      'src/api/userCat.js',
      'src/router/routers.js',
      'src/router/index.js',
      'src/assets/js/bus.js',
      'src/assets/js/echarts.js',
      'src/assets/js/element-ui.js',
      'src/assets/less/base.less',
      'src/assets/less/common.less',
      'src/assets/less/transition.less',
      'src/assets/images/login.png',
      'src/assets/images/logo.png',
      'src/assets/images/operation.png',
      'src/assets/images/policeicon.png',
      'src/assets/images/suoluetu.png',
      'src/assets/images/xiaoxi.png',
      'src/assets/images/zdl.png',
      'src/components/BaseBreadCrumb.vue',
      'src/components/BaseButton.vue',
      'src/components/BasePageHeader.vue',
      'src/components/BasePagination.vue',
      'src/components/FormItem.vue',
      'src/components/index.js',
      'src/components/plupload.vue',
      'src/components/SearchForm.vue',
      'src/mixins/crud.js',
      'src/mixins/dialog.js',
      'src/mixins/emitter.js',
      'src/mixins/user.js',
      'src/page/accountManage/account.vue',
      'src/page/controlType/index.vue',
      'src/page/userManage/user.vue',
      'src/page/workOrderSystem/examineDetail.vue',
      'src/page/workOrderSystem/userCreateExamine.vue',
      'src/page/layout/components/Header.vue',
      'src/page/layout/components/SidebarItem.vue',
      'src/page/layout/layout.vue',
      'src/page/login/login.vue',
      'src/plugin/plugin.js',
      'src/page/login/login.vue',
      'src/store/modules/user.js',
      'src/store/getters.js',
      'src/store/index.js',
      'src/store/mutation-type.js',
      'src/utils/base.js',
      'src/utils/file-md5.js',
      'src/utils/flexible.js',
      'src/utils/jsencrypt.js',
      'static/version.json',
      'build/build.js',
      'build/check-versions.js',
      'build/logo.png',
      'build/utils.js',
      'build/vue-loader.conf.js',
      'build/webpack.base.conf.js',
      'build/webpack.dev.conf.js',
      'build/webpack.prod.conf.js',
      'config/dev.env.js',
      'config/index.js',
      'config/prod.env.js'
       
      
    ]

    templates.forEach(item => {
      // item => 每个文件路径
  
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(item),
        this.answers
      )
    })
  }
}