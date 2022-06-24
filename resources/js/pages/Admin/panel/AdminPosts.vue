<template>
    <section>
        <div class="d-flex align-items-center mb-4">
            <div class="d-flex align-items-center me-2">
                <button class="btn btn-outline-primary mb-0 me-2"
                   :class="activeView === 'panel'? 'active': '' "
                   @click="changeActive('panel')"
                >
                    По 1
                </button>
                <button class="btn btn-outline-primary mb-0 me-2"
                   :class="activeView === 'tile'? 'active': '' "
                   @click="changeActive('tile')"
                >
                    По 4
                </button>
            </div>
        </div>
        <Loader v-if="getLoading"/>
        <div v-else-if="!getLoading"
             class="admin-panel__posts"
             :class="activeView"
        >
            <AdminPostEl v-for="post in getPostsAdmin"
                         :id="post.id"
                         :title="post.title"
                         :preview="post.preview"
                         :date="post.created_at"
                         :typeBlock="activeView"
            />
        </div>
    </section>
</template>

<script>
import AdminPostEl from "./AdminPostEl";
import {mapActions, mapGetters} from "vuex";
import Loader from "../../../components/Loader";

export default {
    name: "AdminPosts",
    components: {Loader, AdminPostEl},
    data: () => ({
        activeView: 'tile'
    }),
    methods: {
        ...mapActions([
            'loadPostsAdmin'
        ]),
        changeActive(value) {
            this.activeView = value
        }
    },
    computed: {
        ...mapGetters([
            'getLoading',
            'getPostsAdmin'
        ])
    },
    mounted() {
        this.loadPostsAdmin()
    }
}
</script>

<style scoped>
.admin-panel__posts {
    display: grid;
    gap: 10px;
}
.admin-panel__posts.panel {
    grid-template-columns: 1fr;
}
.admin-panel__posts.tile {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
}
</style>
