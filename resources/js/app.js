import {createApp} from 'vue'
import Application from "./Application"
import router from "./router/router"
import store from "./store/store"
import Ckeditor from "@ckeditor/ckeditor5-vue"
const app = createApp(Application)

app.use(router)
app.use(store)
app.use(Ckeditor)

app.mount("#app")

app.component('ck-editor', require('./components/creditor').default);
