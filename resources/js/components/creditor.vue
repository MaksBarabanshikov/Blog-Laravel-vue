<template>
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    <div class="mt-4">
        <button class="btn btn-success me-3"
                @click="displayEditorResult()"
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

        console.log('Component mounted.')
    },
    methods: {
        emptyEditor() {
            this.editorData = '';
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
    }
}
</script>

<style scoped>

</style>
