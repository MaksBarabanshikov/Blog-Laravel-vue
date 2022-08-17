import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/lib/router";

import "@/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const app = createApp(App);

app.use(router).mount("#app");
