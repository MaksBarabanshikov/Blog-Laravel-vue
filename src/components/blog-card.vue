<template>
  <div class="all-block-card col-3">
    <div
      class="row g-0 border rounded overflow-hidden flex-column shadow-sm position-relative"
    >
      <div class="col-auto d-none d-lg-block">
        <img :src="thumbnail" alt="изображение" />
      </div>
      <div class="col p-4 m-0 d-flex flex-column position-static">
        <h3 class="mb-0 text-nowrap overflow-hidden">{{ title }}</h3>
        <div class="mb-1 text-success">
          {{ new Date(date).toLocaleString() }}
        </div>
        <div class="card-text mb-auto text-nowrap overflow-hidden">
          {{ preview }}
        </div>
        <router-link
          :to="{ name: 'post', params: { id } }"
          class="stretched-link"
        >
          Continue reading
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogCard",
  props: {
    id: {
      type: Number,
      default: 0,
      required: true,
    },
    title: {
      type: String,
      default: null,
      required: true,
    },
    preview: {
      type: String,
      default: null,
      required: true,
    },
    date: {
      type: String,
      default: null,
      required: true,
    },
    thumbnail: {
      type: String,
      default: null,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  text-overflow: ellipsis;
}

img {
  max-height: 200px;
  width: 100%;
}

.all-block-card {
  transition: all 0.15s linear;

  &:hover {
    transform: scale(1.05);
  }
}
</style>
