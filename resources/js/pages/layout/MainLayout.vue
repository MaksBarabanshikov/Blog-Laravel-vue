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
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default {
    name: "MainLayout",
    components: {
        Footer,
        Header,
    },
}
</script>

<style scoped>

</style>
