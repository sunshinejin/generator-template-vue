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
      '.gitignore',
      '.postcssrc.js',
      'package.json',
      'package-lock.json',
      'README.md',
      'index.html',
      'src/App.vue',
      'src/main.js',
      'src/router/routers.js',
      'src/router/index.js',
      'src/assets/js/bus.js',
      'src/assets/js/echarts.js',
      'src/assets/less/base.less',
      'src/assets/less/common.less',
      'src/assets/less/transition.less',
      'src/components/BaseBreadCrumb.vue',
      'src/components/BaseButton.vue',
      'src/components/BasePageHeader.vue',
      'src/components/FormItem.vue',
      'src/components/index.js',
      'src/components/SearchForm.vue',
      'src/mixins/crud.js',
      'src/mixins/dialog.js',
      'src/mixins/emitter.js',
      'src/mixins/user.js',
      'src/page/layout/components/Header.vue',
      'src/page/layout/components/SidebarItem.vue',
      'src/page/layout/layout.vue',
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