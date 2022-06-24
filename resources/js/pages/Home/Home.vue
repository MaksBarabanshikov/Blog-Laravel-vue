<template>
    <main>
        <BigBlog/>
        <Blogs/>
        <RedirectAllBlogs/>
    </main>
</template>

<script>

import Blogs from "./Blogs.vue"
import BigBlog from "./BigBlog";
import RedirectAllBlogs from "./RedirectAllBlogs";
import Loader from "../../components/Loader";
import axios from "axios";
import {mapActions, mapGetters} from "vuex";

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
