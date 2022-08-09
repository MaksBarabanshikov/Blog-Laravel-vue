<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h2">Статистика</h1>
  </div>
  <section>
    <LoaderComp v-if="!!getStatistics.loading" />
    <div v-if="!!getStatistics.data">
      <h4>Постов: {{ getStatistics.data.posts }}</h4>
      <h4>Пользователей: {{ getStatistics.data.users }}</h4>
    </div>
    <MessagePopup
      v-if="!!getStatistics.error"
      :message="getStatistics.error.message"
    />
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LoaderComp from "@/components/loader-comp";
import MessagePopup from "@/components/message-popup";

export default {
  name: "AdminStatistics",
  components: { MessagePopup, LoaderComp },
  methods: {
    ...mapActions(["GET_STATISTICS"]),
  },
  computed: {
    ...mapGetters(["getStatistics"]),
  },
  mounted() {
    this.GET_STATISTICS();
  },
};
</script>

<style scoped></style>
