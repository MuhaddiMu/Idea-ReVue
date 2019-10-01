// vue.config.js

module.exports = {
  publicPath: '/Idea-ReVue/',
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/sass/main.scss"`
      }
    }
  }
}
