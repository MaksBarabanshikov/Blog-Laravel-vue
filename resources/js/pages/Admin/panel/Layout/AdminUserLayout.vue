<template>
    <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Пользователи</h1>
    </div>
    <section>
        <div class="row g-4">
            <AdminUserEl/>
        </div>
    </section>
</template>

<script>
import AdminUserEl from "../AdminUserEl";
export default {
    name: "AdminUserLayout",
    components: {AdminUserEl}
}
</script>

<style scoped>

</style>
