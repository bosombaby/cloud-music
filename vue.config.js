const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const lessUrl=path.join(__dirname+'/src/styles/cover.less')

module.exports = defineConfig({
  transpileDependencies: true,
  //代码检查
  lintOnSave: false,
  css: {
    loaderOptions: {
      less: {
          modifyVars: {

            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${lessUrl}";`,
          },
      },
    },
  },
})
