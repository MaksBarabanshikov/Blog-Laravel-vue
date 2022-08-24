import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import CKEditor from "@ckeditor/ckeditor5-vue"
import router from "@/lib/router";
import { VueQueryPlugin } from "vue-query";

import App from "@/App.vue";
import "@/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPersist);

app.use(router).use(pinia).use(VueQueryPlugin).use(CKEditor).mount("#app");
