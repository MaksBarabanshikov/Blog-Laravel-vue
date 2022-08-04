import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router/index";
import store from "@/store/index";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import "@/main.scss";

createApp(App).use(store).use(router).use(bootstrap).mount("#app");
