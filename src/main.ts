import { createApp } from "vue";
import router from "@/lib/router";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";

import App from "@/App.vue";
import "@/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPersist);

app.use(router).use(pinia).mount("#app");
