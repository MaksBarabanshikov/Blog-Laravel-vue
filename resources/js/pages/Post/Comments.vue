<template>
    <div class="comments mt-5">
        <h1 class="fs-3">Комментарии</h1>
        <div class="comments__body">
            <div class="my-3 p-3 bg-body border rounded shadow-sm">
                <CommentItem
                    v-for="(comment, index) in comments"
                    :text="comment.text"
                    :date="new Date(comment.created_at).toLocaleString()"
                    :name="users[index][0].name"
                />
            </div>
        </div>
    </div>
</template>

<script>

import CommentItem from "./CommentItem";

export default {
    props: {
        comments: {
            type: Array,
        },
        users: {
            type: Array
        }
    },
    name: "Comments",
    components: {
        CommentItem
    }
}
</script>

<style scoped>

</style>
