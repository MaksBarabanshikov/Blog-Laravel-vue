<template>
    <div class="wrapper">
        <Header/>
        <main class="container">
            <router-view/>
        </main>
        <Footer/>
    </div>
</template>

<script>
// window.axios.default.common['X-Requested-With'] = 'XMLHttpRequest';
// window.axios.default.common['X-CSRF-TOKEN'] = window.Laravel.csrfToken;
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
    name: "Application",
    components: {
        Footer,
        Header,
    }
}
</script>

<style scoped>
main {
    min-height: 81vh;
}
</style>
