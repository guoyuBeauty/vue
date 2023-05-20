import { createApp } from "vue";
import router from "./router";
import store from "./store";
import QuillEditor from "vue-quill-editor";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";

// 引入样式  富文本编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

const app = createApp(App);

app.use(QuillEditor);
app.use(ElementPlus);
app.use(store).use(router).mount("#app");
