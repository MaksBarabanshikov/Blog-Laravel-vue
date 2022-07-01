<template>
    <div>
        <Loader v-if="getAdminLoading"/>
        <div v-else-if="!getAdminLoading">
            <div class="post-body mb-5 pb-5">
                <h1 class="d-flex align-items-center">
                    {{ currentPost.title }}
                    <span class="ms-4 p-2 fs-6 d-inline-block bg-success text-white rounded-pill">
                        {{ new Date(currentPost.created_at).toLocaleString() }}
                    </span>
                </h1>
                <div class="text-center my-4">
                    <img :src="currentPost.thumbnail" alt="Ошибка">
                </div>
                <div v-html="currentPost.description"/>
            </div>
            <Form class="mt-5">
                <div class="form-floating">
                    <Field name="text" rules="required" class="form-control" placeholder="Leave a comment here"
                           id="floatingTextarea2" style="height: 100px"></Field>
                    <label for="floatingTextarea2">Оставьте комментарий</label>
                    <ErrorMessage name="text" class="error-message text-danger position-absolute"/>
                </div>
                <button
                    class="btn btn-primary"
                    type="submit"
                    @click="getLog"
                >
                    Оставить комментарий
                </button>
            </Form>
            <Comments v-if="currentPostComments.length" :comments="currentPostComments" :users="currentPostUsers"/>
            <h2 v-else-if="!currentPostComments.length" class="mt-5 text-info">Комментарий нет</h2>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {ErrorMessage, Field, Form} from "vee-validate";
import Comments from "../../../Post/Comments";
import Loader from "../../../../components/Loader";

export default {
    name: "ViewPost",
    components: {
        Field,
        Form,
        ErrorMessage,
        Comments,
        Loader
    },
    methods: {
        ...mapActions([
            'GET_CURRENT_POST'
        ]),
    },
    computed: {
      ...mapGetters([
          'currentPost',
          'currentPostComments',
          'currentPostUsers',
          'getAdminLoading'
      ])
    },
    mounted() {
        this.GET_CURRENT_POST(this.$route.params);
    }
}
</script>

<style scoped>
    img {
        margin: auto;
        max-width: 100%;
        max-height: 400px;
    }
</style>
