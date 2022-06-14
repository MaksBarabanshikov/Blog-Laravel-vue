<template>
    <header v-if="$route.path !== '/' && $route.path !== '/admin/panel' "
            class="py-3 mb-4 border-bottom px-3 sticky-top bg-white">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
                <router-link to="/home"
                             class="fs-4 d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    Laravel 9 + Vue 3 Blog
                </router-link>
                <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li>
                        <router-link to="/home" class="nav-link px-2 link-secondary">Главная</router-link>
                    </li>
                    <li>
                        <router-link to="/all-blogs" class="nav-link px-2 link-dark">Все блоги</router-link>
                    </li>
                </ul>
                <div class="col-md-3 d-flex justify-content-end">
                    <div
                        v-if="!accessToken"
                        class="d-flex align-items-center"
                    >
                        <button
                            type="button"
                            class="btn btn-outline-primary me-2"
                            @click="$router.push({name: 'auth'})"
                        >
                            Войти
                        </button>
                        <button
                            type="button"
                            class="btn btn-outline-success me-2"
                            @click="$router.push({name: 'reg'})"
                        >
                            Регистрация
                        </button>
                    </div>
                    <div
                        v-if="accessToken"
                        class="d-flex align-items-center"
                    >
                        <h5 class="mb-0 ">
                            {{ name }}
                        </h5>
                        <button
                            type="button"
                            class="btn btn-outline-danger mx-2"
                            @click.prevent="logout"
                        >
                            Выйти
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </header>
</template>

<script>

import api from "../api/api";

export default {
    name: "Header",
    data: () => ({
        accessToken: null,
        name: null
    }),
    mounted() {
        this.getAccessToken()
        this.getName()
    },
    updated() {
        this.getAccessToken()
        this.getName()
    },
    methods: {
        getAccessToken() {
            this.accessToken = localStorage.getItem('access_token')
        },

        logout() {
            api.post('/api/auth/logout')
                .then(res => {
                    localStorage.removeItem('access_token')
                    this.$router.push({name: 'auth'})
                })
        },

        getName() {
            api.post('/api/auth/me')
                .then(res => {
                    this.name = res.data.name
                })
                .catch(e => {
                    console.log(e)
                })
        }
    }
}
</script>

<style scoped>

</style>
