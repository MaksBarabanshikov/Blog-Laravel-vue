<template>
  <div class="mini-blog col-md-6">
    <div
      class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
    >
      <div class="col-8 p-4 d-flex flex-column position-static">
        <h3 class="mb-2">{{ title }}</h3>
        <strong class="my-2 text-success">Nov 12</strong>
        <p class="card-text mb-2">
          {{ preview }}
        </p>
        <strong class="d-block text-info my-2">
          Коментирован {{ comments_count }} раз
        </strong>
        <router-link
          :to="{ name: 'post', params: { id } }"
          class="stretched-link"
          >Continue reading...</router-link
        >
      </div>
      <div class="col-4 d-none d-lg-block">
        <img class="w-100 h-100" :src="thumbnail" alt="Изображения" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MiniBlog",
  props: {
    id: {
      type: Number,
      required: true,
      default: 0,
    },
    title: {
      type: String,
      required: true,
      default: "",
    },
    preview: {
      type: String,
      required: true,
      default: "",
    },
    thumbnail: {
      type: String,
      required: true,
      default: "",
    },
    comments_count: {
      type: Number,
      required: true,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
.mini-blog {
  transition: all 0.15s linear;
  &:hover {
    transform: scale(1.03);
  }
}
</style>
