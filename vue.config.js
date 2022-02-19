module.exports = {
  devServer: {
    proxy: {
      '/dai': {
        target: 'http://122.9.5.209:14141',
        ws: true,
        pathRewrite:{
          "^/dai":''
        }
      }

    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/' 
}
