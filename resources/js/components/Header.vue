<template>
    <header class="py-3 mb-4 border-bottom px-3 sticky-top bg-white">
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
                        v-if="!token"
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
                        v-if="token"
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

import axios from "../utils/axios";
import {mapActions, mapGetters} from "vuex";

export default {
    name: "Header",
    data: () => ({
        token: null,
        name: null
    }),
    methods: {
        ...mapActions([
           'LOGOUT'
        ]),

        logout() {
            this.LOGOUT().then(() => {
                this.$router.push({name: 'auth'})
            })
        },

        getToken() {
            this.token = localStorage.getItem('x_xsrf_token')
        },

        getName() {
            if (localStorage.getItem('x_xsrf_token')) {
                axios.get('/api/user')
                    .then(res => {
                        this.name = res.data.name
                    })
                    .catch(e => {
                    })
            }
        }
    },
    computed: {
        ...mapGetters([
            'getLogout'
        ])
    },
    mounted() {
        this.getToken()
        this.getName()
    },
}
</script>

<style scoped>

</style>
