<script>
import { ref, defineAsyncComponent } from "vue";
import UploadAdapter from "@/utils/upload-adapter";

export default {
  props: {
    content: String,
    default: null,
  },
  name: "CreditorComp",
  components: {
    ckeditor: defineAsyncComponent(() => {
      return import("@ckeditor/ckeditor5-vue").then(
        (module) => module.component
      );
    }),
  },
  setup() {
    const IsBrowser = typeof window !== "undefined";
    let CKEditorClassic = ref(null);

    if (IsBrowser) {
      import("@ckeditor/ckeditor5-build-classic").then(
        (e) => (CKEditorClassic.value = e.default)
      );
    }

    return { IsBrowser, CKEditorClassic };
  },
  data() {
    return {
      editorData: "<p>123123</p>",
      editorConfig: {
        extraPlugins: [this.uploader],
      },
    };
  },
  mounted() {
    if (this.content) {
      this.editorData = this.content;
    }

    console.log("Component mounted.");
  },
  methods: {
    emptyEditor() {
      this.editorData = "";
    },

    inputListener() {
      return this.$emit("inputListener", this.editorData);
    },

    sendEditorData() {
      return this.$emit("editorData", this.editorData);
    },

    displayEditorResult() {
      document.getElementById("resultingText").innerHTML = this.editorData;
    },

    uploader(editor) {
      editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return new UploadAdapter(loader);
      };
    },
  },
  // watch: {
  //     editorData() {
  //         this.editorData.$emit('changeEditor')
  //     }
  // }
};
</script>

<template>
  <ckeditor
    @input="inputListener"
    v-model="editorData"
    :editor="CKEditorClassic"
    :config="editorConfig"
  />
  <div class="mt-4">
    <button class="btn btn-success me-3" @click="sendEditorData()">
      Результат
    </button>
    <button class="btn btn-danger" @click="emptyEditor()">Очистить</button>
  </div>

  <div id="resultingText"></div>
</template>
