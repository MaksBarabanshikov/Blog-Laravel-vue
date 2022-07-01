<template>
    <Loader v-if="getLoading"/>
    <div v-else-if="!getLoading && !getNotFound">
        <div>
            <div class="post-body mb-5 pb-5">
                <h1 class="d-flex align-items-center">{{ getPostData.title }}
                    <span
                    class="ms-4 p-2 fs-6 d-inline-block bg-success text-white rounded-pill">
                    {{
                        new Date(getPostData.created_at).toLocaleString()
                    }}
                </span>
                </h1>
                <p>
                    {{ getPostData.description }}
                </p>
            </div>

            <Form class="mt-5" @submit="onSubmit">
                <div class="form-floating">
                    <Field name="text" rules="required" class="form-control" placeholder="Leave a comment here"
                           id="floatingTextarea2" style="height: 100px"></Field>
                    <label for="floatingTextarea2">Оставьте комментарий</label>
                    <ErrorMessage name="text" class="error-message text-danger position-absolute"/>
                </div>
                <button
                    class="btn btn-primary"
                    type="submit"
                >
                    Оставить комментарий
                </button>
            </Form>
            <Comments :comments="getCommentsData" :users="getUsersData"/>
        </div>
    </div>
    <div v-if="getNotFound"
         class="alert alert-danger"
         role="alert"
    >
        404 Пост не найден(
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Loader from "../../components/Loader";
import Comments from "./Comments";
import {Field, Form, ErrorMessage, defineRule} from "vee-validate";
import axios from "../../utils/axios"

defineRule("required", value => {
    if (!value) {
        return "Комментарий не должен быть пустым";
    }
    return true;
});

export default {
    name: "Post",
    components: {
        Loader,
        Field,
        Form,
        ErrorMessage,
        Comments,
    },
    methods: {
        ...mapActions([
            'loadPostData'
        ]),
        onSubmit(values) {
            console.log(values)
            this.sendComment(values.text)
        },

        async sendComment(data) {
            await axios.post(`/api/posts/comment/${this.$route.params.id}`, {text: data})
                .then(res => {
                    console.log(res);
                })
                .catch(e => {
                    console.log(e);
                })
        }

    },
    computed: {
        ...mapGetters([
            'getPostData',
            'getCommentsData',
            'getUsersData',
            'getLoading',
            'getNotFound'

        ])
    },
    mounted() {
        this.loadPostData()
    },
}
</script>

<style scoped>
h1 span {
    font-size: 14px;
}
</style>
