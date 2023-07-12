const config = {
  isDev: parse(process.env.VUE_APP_IS_DEV, false),
  features: {},
};
function feature(name) {
  return config.features[name];
}
// eslint-disable-next-line no-unused-vars
function parse(value, fallback) {
  if (typeof value === "undefined") {
    return fallback;
  }
  switch (typeof fallback) {
    case "boolean":
      return value.toLowerCase() == "true";
    case "number":
      return JSON.parse(value);
    default:
      return value;
  }
}
export { config };
export default {
  install: (app) => {
    app.config.globalProperties.$appConfig = config;
    app.config.globalProperties.$feature = feature;
  },
};
