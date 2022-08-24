<template>
  <ckeditor
    v-model="editorData"
    :editor="editor"
    :config="editorConfig"
    @input="inputListener"
  />
  <div class="mt-4">
    <button class="btn btn-danger" @click.prevent="emptyEditor()">
      Очистить
    </button>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { defineAsyncComponent } from "vue";

export default {
  name: "CreditorComp",
  props: {
    content: String,
    default: null,
  },
  emits: ["inputListener"],
  components: {
    ckeditor: defineAsyncComponent(() => {
      return import("@ckeditor/ckeditor5-vue").then(
        (module) => module.component
      );
    }),
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {},
    };
  },
  mounted() {
    if (this.content) {
      this.editorData = this.content;
    }
  },
  methods: {
    emptyEditor() {
      this.editorData = "";
    },

    inputListener() {
      return this.$emit("inputListener", this.editorData);
    },
  },
};
</script>
