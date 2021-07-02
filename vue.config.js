module.exports = {
  // chainWebpack: config => {
  //   /* disable insertion of assets as data urls b/c Phaser doesn't support it */
  //   const rules = [
  //     { name: "images", dir: "img" },
  //     { name: "media", dir: "media" }
  //   ];
  //   rules.forEach(rule => {
  //     const ruleConf = config.module.rule(rule.name);

  //     ruleConf.uses.clear();

  //     ruleConf
  //       .use("file-loader")
  //       .loader("file-loader")
  //       .options({
  //         name: `${rule.dir}/[name].[hash:8].[ext]`
  //       });
  //   });
  // },
  chainWebpack: config => {
    // config.module
    //   .rule("vue")
    //   .test(/\.vue$/)
    //   .use("image-size-loader")
    //   .loader("image-size-loader")
    //   .end();

    config.module
      .rule("images")
      .use("url-loader")
      .tap(options => {
        options.limit = 1;
        return options;
      });
    config.module
      .rule("media")
      .use("url-loader")
      .tap(options => {
        options.limit = 1;
        return options;
      });
  },
  devServer: {
    open: true,
    hot: true
  },
  css: {
    loaderOptions: {
      scss: {
        // sass-loader v8.0.0+, use `data:` for elder version
        prependData: `@import "~@/assets/css/vw.scss";`
      },
      postcss: {
        plugins: [require("autoprefixer"), require("./src/rpf/un/postcss-auto-bg-plugin")]
      }
    }
  },
  configureWebpack: {
    externals: {
      TMap: "TMap"
    }
  }
};
