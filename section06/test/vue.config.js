module.exports = {
  publicPath: '',
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/sass/main.scss";`
      },
    }
  }
}
