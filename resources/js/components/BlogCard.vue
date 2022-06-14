<template>
    <div class="col-3">
        <div class="row g-0 border rounded overflow-hidden flex-column shadow-sm position-relative">
            <div class="col-auto d-none d-lg-block">
                <img :src="thumbnail" alt="">
            </div>
            <div class="col p-4 m-0 d-flex flex-column position-static">
                <strong class="d-inline-block mb-2 text-primary">World</strong>
                <h3 class="mb-0 text-nowrap overflow-hidden">{{ title }}</h3>
                <div class="mb-1 text-success">{{ new Date(date).toLocaleString() }}</div>
                <div class="card-text mb-auto text-nowrap overflow-hidden">{{
                        preview
                    }}
                </div>
                <router-link
                    :to="{ name: 'post', params: { id }}"
                    class="stretched-link"
                >
                    Continue reading
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: Number,
        },
        title: {
            type: String,
            default: null
        },
        preview: {
            type: String,
            default: null
        },
        date: {
            type: String,
            default: null
        },
        thumbnail: {
            type: String,
            default: null
        }
    },
    name: "BlogCard"
}
</script>

<style scoped>
* {
    text-overflow: ellipsis;
}
</style>
