<template>
    <ckeditor @input="inputListener" :editor="editor" v-model="editorData" :config="editorConfig"/>
    <div class="mt-4">
        <button class="btn btn-success me-3"
                @click="sendEditorData()"
        >
            Результат
        </button>
        <button class="btn btn-danger"
                @click="emptyEditor()"
        >
            Очистить
        </button>
    </div>

    <div id="resultingText"></div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import UploadAdapter from "../UploadAdapter/UploadAdapter";

export default {
    props: {
        content: String,
        default: null
    },
    name: "creditor",
    data() {
        return {
            editor: ClassicEditor,
            editorData: '',
            editorConfig: {
                extraPlugins: [this.uploader]
            },
        };
    },
    mounted(){
        if (this.content) {
            this.editorData = this.content
        }
        console.log('Component mounted.')
    },
    methods: {
        emptyEditor() {
            this.editorData = '';
        },

        inputListener() {
            return this.$emit('inputListener', this.editorData)
        },

        sendEditorData() {
          return this.$emit('editorData', this.editorData)
        },

        displayEditorResult(){
            document.getElementById('resultingText').innerHTML = this.editorData;
        },

        uploader(editor)
        {
            editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
                return new UploadAdapter( loader );
            };
        },
    },
    // watch: {
    //     editorData() {
    //         this.editorData.$emit('changeEditor')
    //     }
    // }
}
</script>

<style scoped>

</style>
