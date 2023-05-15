/*
 * @Description:
 * @Author: Wu Wei
 * @Date: 2021-09-09 14:38:26
 * @LastEditTime: 2021-09-09 14:59:58
 * @LastEditors: Wu Wei
 * @FilePath: \vue-admin\vue.config.js
 */
const path = require("path");

module.exports = {
  // 部署应用时的基本 URL
  publicPath: "/",

  // build时构建文件的目录 构建时传入 --no-clean 可关闭该行为
  outputDir: "dist",
  runtimeCompiler: true,
  devServer: {
    open: true,
    proxy: {
      "^/": {
        target: "http://127.0.0.1:8080/",
        changeOrigin: true,
        pathRewrite: { "/": "" },
        // ws: true,
        // logLevel: "debug",
      },
    },
  },

  configureWebpack: (config) => {
    config.resolve = {
      extensions: [".js", ".ts", ".json", ".vue"], //自动添加文件名后缀
      alias: {
        //配置解析别名
        "@": path.resolve(__dirname, "./src"),
      },
    };
  },
};
