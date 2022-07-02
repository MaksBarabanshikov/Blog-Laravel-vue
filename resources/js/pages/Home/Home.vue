<template>
    <main>
        <BigBlog/>
        <Blogs/>
    </main>
</template>

<script>

import Blogs from "./Blogs.vue"
import BigBlog from "./BigBlog";
import RedirectAllBlogs from "./RedirectAllBlogs";
import Loader from "../../components/Loader";

export default {
    name: "Home",
    components: {
        Loader,
        RedirectAllBlogs,
        BigBlog,
        Blogs,
    },
}
</script>

<style scoped>

</style>
