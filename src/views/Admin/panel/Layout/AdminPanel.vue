<script setup lang="ts">
import { useLogoutAdminMutation } from "@/lib/services/auth.service";

const { mutate } = useLogoutAdminMutation();
</script>

<template>
  <div class="admin">
    <header class="navbar navbar-dark bg-dark flex-md-nowrap pe-3">
      <router-link
        to="/home"
        class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6"
        >На главную</router-link
      >
      <button
        class="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-nav">
        <div class="nav-item text-nowrap">
          <a class="nav-link px-3 text-danger" @click.prevent="mutate">Выйти</a>
        </div>
      </div>
    </header>
    <div class="container-fluid pe-4 pb-4">
      <div class="row p-0">
        <nav
          id="sidebarMenu"
          class="col-auto d-md-block bg-light sidebar collapse"
        >
          <div class="position-sticky pt-3">
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link :to="{ name: 'AdminStatistics' }" class="nav-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-file align-text-bottom"
                    aria-hidden="true"
                  >
                    <path
                      d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
                    ></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                  </svg>
                  Статистика
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'AdminGetPosts' }" class="nav-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-file align-text-bottom"
                    aria-hidden="true"
                  >
                    <path
                      d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
                    ></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                  </svg>
                  Посты
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'AdminUsers' }" class="nav-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-users align-text-bottom"
                    aria-hidden="true"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  Пользователи
                </router-link>
              </li>
            </ul>
          </div>
        </nav>
        <main class="col">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "AdminPanel",
};
</script>

<style lang="scss" scoped>
.container-fluid {
  height: 100vh;
  max-height: 94vh;
  padding-bottom: 0 !important;
}

.row {
  height: 100%;
}

header {
  .nav-link {
    color: #dc3545 !important;
    font-weight: 700;
    cursor: pointer;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      display: block;
      height: 2px;
      width: 0;
      border-radius: 2px;
      background-color: #dc3545;
      transition: all 0.15s linear;
    }

    &:hover {
      &:after {
        width: 60px;
      }
    }
  }
}
</style>
