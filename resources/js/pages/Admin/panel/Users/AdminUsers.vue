<template>
    <Loader v-if="getAdminLoading"/>
    <div v-else
         class="admin-panel__users row g-4"
    >
        <AdminUserEl v-for="user in allUsers"
                     :id="user.id"
                     :name="user.name"
                     :email="user.email"
                     :date="normalizeDate(user.created_at)"
        />
    </div>
</template>

<script>
import Loader from "../../../../components/Loader";
import AdminUserEl from "./AdminUserEl";
import {mapActions, mapGetters} from "vuex";

export default {
    name: "AdminUsers",
    components: {AdminUserEl, Loader},
    methods: {
        ...mapActions([
            'GET_ALL_USERS'
        ]),
        normalizeDate: createdAt => {
            const date =  new Date(createdAt)
            return ('0' + date.getDate()).slice(-2) + '.'
                + ('0' + (date.getDate() + 1)).slice(-2) + '.'
                + date.getFullYear()

        }
    },
    computed: {
      ...mapGetters([
          'getAdminLoading',
          'allUsers'
      ])
    },
    mounted() {
        this.GET_ALL_USERS()
    }
}
</script>

<style scoped>

</style>
