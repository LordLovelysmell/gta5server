import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./stores/index.js";

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");

global.app = App;
global.appData = store;
global.router = router;
