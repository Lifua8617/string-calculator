// vue.config.js
module.exports = {
  publicPath: '/string_calculator/',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '糸計算ツール'
        return args
      })
  }
}