<template>
        <div class="post-body mb-5 pb-5">
                <h1 class="d-flex align-items-center">
                    {{ title }}
                    <span class="ms-4 p-2 fs-6 d-inline-block bg-success text-white rounded-pill">
                        {{ date }}
                    </span>
                </h1>
                <div class="text-center my-4">
                    <img :src="thumbnail" alt="Изображение">
                </div>
                <div v-html="description"/>
            <Form class="mt-5" @submit="onSubmit">
                <div class="form-floating">
                    <Field name="text" rules="required" class="form-control" placeholder="Leave a comment here"
                           id="floatingTextarea2" style="height: 100px"></Field>
                    <label for="floatingTextarea2">Оставьте комментарий</label>
                    <ErrorMessage name="text" class="error-message text-danger position-absolute"/>
                </div>
                <button
                    class="btn btn-primary position-relative"
                    type="submit"
                >
                    <span v-if="!!!sendComment.error">Оставить комментарий</span>
                    <span v-if="!!sendComment.error">{{sendComment.error}}</span>
                    <Loader class="button-loader position-static" v-if="sendComment.loading"/>
                </button>
            </Form>
        </div>
        <Comments v-if="comments.length"
                  :comments="comments"
        />
        <h2 v-else-if="!comments.length" class="my-5 text-info">Комментарий нет</h2>
</template>

<script>
import Comments from "./Comments";
import {Field, Form, ErrorMessage, defineRule} from "vee-validate";
import MessagePopup from "../../components/MessagePopup";
import {mapActions, mapGetters} from "vuex";
import Loader from "../../components/Loader";

defineRule("required", value => {
    if (!value) {
        return "Комментарий не должен быть пустым";
    }
    return true;
});

export default {
    props: {
        title: {
          type: String
        },
        date: {
          type: String
        },
        thumbnail: {
          type: String
        },
        description: {
          type: String
        },
        comments: {
            type: Array
        }
    },
    name: "Post",
    components: {
        Loader,
        MessagePopup,
        Field,
        Form,
        ErrorMessage,
        Comments,
    },
    methods: {
        ...mapActions([
           'SEND_COMMENT'
        ]),
        onSubmit(values) {
            this.SEND_COMMENT({
                id: this.$route.params,
                message: values.text
            })
        },
    },
    computed: {
        ...mapGetters([
            'sendComment'
        ])
    }
}
</script>

<style scoped>
h1 span {
    font-size: 14px;
}
img {
    margin: auto;
    max-width: 100%;
    max-height: 400px;
}

.button-loader {
    font-size: 20px !important;
    margin: 0 0 5px 5px;
}

</style>
