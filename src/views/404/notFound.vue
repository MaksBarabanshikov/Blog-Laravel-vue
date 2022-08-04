<template>
  <section class="notFound">
    <div class="img text-center">
      <img
        src="https://assets.codepen.io/5647096/backToTheHomepage.png"
        alt="Back to the Homepage"
      />
      <img
        src="https://assets.codepen.io/5647096/Delorean.png"
        alt="El Delorean, El Doc y Marti McFly"
      />
    </div>
    <div class="text">
      <h1 class="text-danger fw-bold">404</h1>
      <h2>Страница не найдена</h2>
      <h3>Вернуться назад?</h3>
      <router-link class="btn btn-primary" to="/home">Да</router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: "notFound",
};
</script>

<style scoped>
section {
  color: #ffffff;
  text-align: center;
  background-color: #000000;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='42' height='58' viewBox='0 0 42 58'%3E%3Cg fill='%23dddcdd' fill-opacity='0.23'%3E%3Cpath fill-rule='evenodd' d='M12 18h12v18h6v4H18V22h-6v-4zm-6-2v-4H0V0h36v6h6v36h-6v4h6v12H6v-6H0V16h6zM34 2H2v8h24v24h8V2zM6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM2 50h32v-8H10V18H2v32zm28-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-8a2 2 0 1 0 0 4 2 2 0 0 0 0-4z'/%3E%3C/g%3E%3C/svg%3E");
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: absolute;
  width: 100vw;
  left: 0;
  top: 0;
  z-index: 1000000;
  overflow: hidden;
}

section.notFound h1 {
  font-size: 100px;
}

section.notFound h2 {
  font-size: 50px;
}

section.notFound h1,
h2,
h3 {
  margin-bottom: 40px;
}

div.img {
  max-width: 730px;
}

div.text {
  height: 50vh;
}

div.text a {
  text-decoration: none;
  width: 80px;
}
</style>
