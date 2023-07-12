module.exports = {
  publicPath: "",
  configureWebpack: {
    externals: {
      "@vue/composition-api": "@vue/composition-api",
      "vuex-composition-helpers": "vuex-composition-helpers",
    },
  },
};
