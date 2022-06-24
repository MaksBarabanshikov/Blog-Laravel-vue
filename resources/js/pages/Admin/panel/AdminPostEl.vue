<template>
    <div class="admin-panel__posts_post bg-white border rounded-3 overflow-hidden">
        <div class="d-flex justify-content-between align-items-center border-bottom bg-light p-3">
            <h1 class="fs-5 mb-0 text-secondary text-uppercase">
                {{ title }}
            </h1>
            <span>
              {{ new Date(date).toLocaleString() }}
          </span>
        </div>
        <div class="post-content p-3 align-items-center justify-content-between"
             :class="typeBlock === 'panel' ? 'd-flex': 'd-block'"
        >
            <div>
                <p class="mb-2">
                    {{ preview }}
                </p>
                <p class="mb-0">
                    Комментариев: 0
                </p>
            </div>

            <div
                class="d-flex"
                :class="typeBlock !== 'panel'? 'mt-2': '' "
            >
                <button class="btn btn-info me-2">
                    Просмотр
                </button>
                <button class="btn btn-warning me-2">
                    Редактировать
                </button>
                <button class="btn btn-danger"
                        @click.prevent="deleteAdminPost({id: id})"
                >Удалить
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from "vuex";

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
        typeBlock: {
            type: String,
            default: null
        }
    },
    name: "AdminPostEl",
    methods: {
        ...mapActions([
            'deleteAdminPost'
        ])
    }
}
</script>

<style scoped>

</style>
