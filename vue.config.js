module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 80,
    proxy: {
      '/dai': {
        target: 'http://121.37.67.75:11111',
        ws: true,
        pathRewrite: {
          "^/dai": ''
        }
      }

    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
}
