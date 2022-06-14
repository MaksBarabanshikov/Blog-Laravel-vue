import {createApp} from 'vue'
import Application from "./Application"
import router from "./router/router";
import {VueSpinner} from "vue3-spinners";

const app = createApp(Application)
app.use(router)
app.use(VueSpinner)
app.mount("#app")
