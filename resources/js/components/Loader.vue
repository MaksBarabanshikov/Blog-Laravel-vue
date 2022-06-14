<template>
    <VueSpinnerBall class="spinner"/>
</template>

<script>
import {VueSpinnerBall} from "vue3-spinners";

export default {
    name: "Loader",
    components: {
        VueSpinnerBall
    }
}
</script>

<style scoped>
    .spinner {
        position: absolute;
        left: 50%;
        top: 30%;
        font-size: 40px;
    }
</style>
