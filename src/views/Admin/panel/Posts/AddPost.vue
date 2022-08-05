<template>
    <div>
        <h4 class="py-3">Добавить новый пост</h4>
        <Form enctype="multipart/form-data" @submit="onSubmit">
            <div class="form-floating">
                <Field
                    name="title"
                    type="text"
                    class="form-control"
                    id="floatingTitle"
                    placeholder="Название поста"
                    rules="required"
                />
                <ErrorMessage class="error-message text-danger position-absolute" name="title"/>
                <label for="floatingTitle">Заголовок</label>

            </div>
            <div class="form-floating">
                <Field
                    name="preview"
                    type="email"
                    class="form-control"
                    id="floatingPreview"
                    placeholder="Краткое описание блога"
                    rules="required"
                />
                <ErrorMessage class="error-message text-danger position-absolute" name="email"/>
                <label for="floatingPreview">Описание</label>
            </div>
            <img id="previewImage" src="" alt="">
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
            <creditor @inputListener="currentValue"/>
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
                <Loader v-if="createPost.loading"/>
                <span v-if="!!createPost.error">{{createPost.error}}</span>
                <span v-if="!!!createPost.error">Добавить пост</span>
            </button>
        </Form>
    </div>
</template>

<script>
import {Form, Field, ErrorMessage, defineRule} from 'vee-validate'
import Loader from "../../../../components/Loader";
import creditor from "../../../../components/creditor";
import {mapActions, mapGetters} from "vuex";

defineRule("required", value => {
    if (!value) {
        return "Обязательное поле";
    }

    return true;
});

export default {
    components: {
        creditor,
        Loader,
        Form,
        Field,
        ErrorMessage
    },
    name: "AddPost",
    data: () => ({
        description: '',
        image: null,
    }),
    computed: {
      ...mapGetters([
          'createPost'
      ])
    },
    methods: {
        onSubmit(data) {
            this.CREATE_POST({
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
        ...mapActions([
            'CREATE_POST'
        ])
    }
}
</script>

<style scoped>
img {
    max-width: 300px;
    max-height: 300px;
}
</style>
