<template>
    <div class="d-flex text-muted border-bottom align-items-center py-3">
        <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32"
             xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32"
             preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title>
            <rect width="100%" height="100%" fill="#007bff"></rect>
            <text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text>
        </svg>

        <p class="mb-0 small lh-sm">
            <strong class="d-flex align-items-center text-gray-dark mb-3">
                {{ name }}
                <span class="d-inline-block ms-5">{{ date }}</span>
            </strong>
            {{ text }}
        </p>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
        },
        date: {
            type: String
        },
        name: {
            type: String
        }
    },
    name: "CommentItems"
}
</script>

<style scoped>

</style>
