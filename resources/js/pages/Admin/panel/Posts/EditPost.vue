<template>
    <Loader v-if="currentPost.loading"/>
    <div v-else-if="!!currentPost.data && !currentPost.loading">
        <h4 class="py-3">Редактировать пост</h4>
        <Form enctype="multipart/form-data" @submit="onSubmit">
            <div class="form-floating">
                <Field
                    name="title"
                    type="text"
                    class="form-control"
                    id="floatingTitle"
                    placeholder=""
                    :value="currentPost.data.title"
                    rules="required"
                />
                <ErrorMessage class="error-message text-danger position-absolute" name="title"/>
                <label for="floatingTitle">Заголовок</label>

            </div>
            <div class="form-floating">
                <Field
                    name="preview"
                    type="text"
                    class="form-control"
                    id="floatingPreview"
                    placeholder="Краткое описание блога"
                    :value="currentPost.data.preview"
                    rules="required"
                />
                <ErrorMessage class="error-message text-danger position-absolute" name="preview"/>
                <label for="floatingPreview">Описание</label>
            </div>
            <img id="previewImage" :src="currentPost.data.thumbnail" alt="">
            <label class="position-static d-flex flex-column px-0">
                Превью
                <input
                    class="mt-2"
                    name="thumbnail"
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    ref="file"
                    @change.prevent="uploadImage"
                />

            </label>
            <label class="my-4">
                Контент поста
            </label>
            <creditor :content="currentPost.data.description" @inputListener="currentValue"/>
            <Field
                name="description"
                type="text"
                class="visually-hidden"
                v-model="description"
                rules="required"
            />
            <button
                class="form-button w-50 btn btn-lg btn-primary mb-2 position-relative mt-4"
                type="submit"
            >
                <Loader v-if="putPost.loading"/>
                <span v-if="putPost.error !== null">{{putPost.error}}</span>
                <span v-if="!!!putPost.error">Изменить пост</span>
            </button>
        </Form>
    </div>
</template>

<script>
import creditor from "../../../../components/creditor";
import {mapActions, mapGetters} from "vuex";
import {ErrorMessage, Field, Form} from "vee-validate";
import Loader from "../../../../components/Loader";

export default {
    name: "EditPost",
    emits: ['inputListener'],
    data: () => ({
        description: '',
        image: null,
    }),
    components: {
        creditor,
        Form,
        Field,
        ErrorMessage,
        Loader
    },
    methods: {
        ...mapActions([
            'GET_CURRENT_POST',
            'UPDATE_POST'
        ]),
        onSubmit(data) {
            this.UPDATE_POST({
                id: this.$route.params,
                newPost: {
                    title: data.title,
                    description: data.description,
                    preview: data.preview,
                    thumbnail: this.image
                }
            })
        },
        currentValue(value) {
            this.description = value
        },
        uploadImage() {
            if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
                alert('Файловые API не полностью поддерживаются в этом браузере.')
            }

            const image = this.$refs.file.files.item(0)

            const reader = new FileReader()

            reader.onload = (e) => {
                document.getElementById('previewImage').src = e.target.result
                this.image = e.target.result
            }

            reader.readAsDataURL(image)
        },

    },
    computed: {
        ...mapGetters([
            'currentPost',
            'putPost'
        ]),
    },
    mounted() {
        this.GET_CURRENT_POST(this.$route.params)
    },
}
</script>

<style scoped>
    img {
        max-width: 300px;
        max-height: 300px;
    }
</style>
