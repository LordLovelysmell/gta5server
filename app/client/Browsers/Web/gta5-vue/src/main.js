import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./stores/index.js";
import configPlugin from "@/config";
import Layout from "./layouts/Layout";

const app = createApp(App)
  .use(store)
  .use(router)
  .use(configPlugin)
  .component("Layout", Layout);

router.isReady().then(() => {
  app.mount("#app");
});

global.app = App;
global.appData = store;
global.router = router;
