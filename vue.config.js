const { defineConfig } = require('@vue/cli-service')
module.exports = {
  transpileDependencies: true,
  devServer: {
    watchFiles: {
      paths: ['src/**/*'],
      options: {
        poll: false,
        ignored: [/node_modules/, /public/],
      },
    },
  },
}