<template>
    <Loader v-if="loading"/>
    <div v-else-if="!loading && !not_found">
        <div>
            <div class="post-body mb-5 pb-5">
                <h1 class="d-flex align-items-center">{{ post.title }}<span
                    class="ms-4 p-2 fs-6 d-inline-block bg-success text-white rounded-pill">{{ date }}</span></h1>
                <p>
                    {{ post.description }}
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
            <Comments :comments="comments" :users="users"/>
        </div>
    </div>
    <div v-if="not_found"
         class="alert alert-danger"
         role="alert"
    >
        404 Пост не найден(
    </div>
</template>

<script>
import Loader from "../../components/Loader";
import api from "../../api/api";
import Comments from "./Comments";
import {Field, Form, ErrorMessage, defineRule} from "vee-validate";

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
        Comments
    },
    data: () => ({
        loading: true,
        post: [],
        comments: [],
        users: [],
        date: null,
        not_found: false
    }),
    mounted() {
        this.loadPost(this.$route.params.id)
    },
    methods: {
        loadPost(id) {
            api.get('/api/auth/blog/posts/' + id)
                .then(res => {
                    this.post = res.data.post
                    this.comments = res.data.comments
                    this.users = res.data.user
                    console.log(this.users)
                    this.date = new Date(res.data.created_at).toLocaleString()
                    this.loading = false
                })
                .catch(e => {
                    console.log(e)
                    this.not_found = true
                    this.loading = false
                })
        },
        onSubmit(values) {
            this.sendComment(values.text)
        },

        sendComment(data) {
            api.post(`/api/auth/posts/comment/${this.$route.params.id}`, {text: data})
                .then(res => {
                    console.log(res);
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }
}
</script>

<style scoped>
h1 span {
    font-size: 14px;
}
</style>
