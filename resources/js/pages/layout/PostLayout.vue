<template>
    <Loader v-if="currentPostUser.loading"/>

    <Post v-if="!!currentPostUser?.data"
          :title="currentPostUser.data.title"
          :date="new Date(currentPostUser.data.created_at).toLocaleString()"
          :thumbnail="currentPostUser.data.thumbnail"
          :description="currentPostUser.data.description"
          :comments="currentPostUser.data.comments"
    />

    <MessagePopup v-if="!!currentPostUser.error"/>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Loader from "../../components/Loader";
import Comments from "../Post/Comments";
import {Field, Form, ErrorMessage, defineRule} from "vee-validate";
import axios from "../../utils/axios"
import MessagePopup from "../../components/MessagePopup";
import Post from "../Post/Post";

defineRule("required", value => {
    if (!value) {
        return "Комментарий не должен быть пустым";
    }
    return true;
});

export default {
    name: "PostLayout",
    components: {
        Post,
        MessagePopup,
        Loader,
        Field,
        Form,
        ErrorMessage,
        Comments,
    },
    methods: {
        ...mapActions([
            'GET_POST_USER'
        ]),
    },
    computed: {
        ...mapGetters([
            'currentPostUser',
        ])
    },
    mounted() {
        this.GET_POST_USER(this.$route.params)
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

</style>
