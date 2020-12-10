import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./stores/index.js";
import configPlugin from '@/config'

const app = createApp(App)
  .use(store)
  .use(router)
  .use(configPlugin);

router.isReady().then(() => {
  app.mount("#app");
})

global.app = App;
global.appData = store;
global.router = router;
