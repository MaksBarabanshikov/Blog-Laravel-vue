<template>
    <h4 class="py-3">Добавить новый пост</h4>
    <Form @submit="onSubmit">
        <div class="form-floating">
            <Field
                name="title"
                type="text"
                class="form-control"
                id="floatingTitle"
                placeholder="Мой блог"
                rules="required"
            />
            <ErrorMessage class="error-message text-danger position-absolute" name="title"/>
            <label for="floatingTitle">Заголовок</label>
        </div>
        <div class="form-floating">
            <Field
                name="preview"
                type="email"
                class="form-control"
                id="floatingPreview"
                placeholder="Краткое описание блога"
                rules="required"
            />
            <ErrorMessage class="error-message text-danger position-absolute" name="email"/>
            <label for="floatingPreview">Описание</label>
        </div>
        <div class="form-floating">
            <label class="position-static d-flex flex-column px-0">
                Превью
                <Field
                    class="mt-2"
                    name="thumbnail"
                    type="file"
                    rules="required"
                />

            </label>
        </div>
        <label class="mb-2">
            Контент поста
        </label>
        <creditor/>
        <div class="">
            <button
                class="form-button w-50 btn btn-lg btn-primary mb-2 position-relative mt-4"
                type="submit"
            >
                <span>Добавить пост</span>
            </button>
        </div>

    </Form>

</template>

<script>
import {Form, Field, ErrorMessage, defineRule} from 'vee-validate'
import Loader from "../../../components/Loader";
import creditor from "../../../components/creditor";

defineRule("required", value => {
    if (!value) {
        return "Обязательное поле";
    }

    return true;
});

export default {
    components: {
        creditor,
        Loader,
        Form,
        Field,
        ErrorMessage
    },
    name: "AddPost",
    methods: {
        onSubmit(data) {
            console.log(data)
        }
    }
}
</script>

<style scoped>

</style>
