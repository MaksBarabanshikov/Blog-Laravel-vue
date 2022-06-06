<template>
<Test/>
<ExampleComponent/>
</template>

<script>
import Test from "./Test";
import ExampleComponent from "./ExampleComponent";

export default {
    name: "Application",
    components: {
        Test,
        ExampleComponent
    }
}
</script>

<style scoped>

</style>
