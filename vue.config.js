const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: './src',
    },
	},
	css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/shared/assets/scss/index.scss";`
      }
    }
  }
});