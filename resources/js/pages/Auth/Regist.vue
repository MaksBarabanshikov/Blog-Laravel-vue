<template>
    <div class="form-signin w-100 m-auto">
        <Form @submit="onSubmit">
            <h1 class="h3 mb-3 fw-normal">Регистрация</h1>
            <div class="form-floating">
                <Field
                    name="name"
                    type="text"
                    class="form-control"
                    id="floatingName"
                    placeholder="Иван Иванов"
                    rules="required"
                />
                <ErrorMessage class="error-message text-danger position-absolute" name="name"/>
                <label for="floatingName">Имя</label>
            </div>
            <div class="form-floating">
                <Field
                    name="email"
                    type="email"
                    class="form-control"
                    id="floatingEmail"
                    placeholder="name@example.com"
                    rules="required|email"
                />
                <ErrorMessage class="error-message text-danger position-absolute" name="email"/>
                <label for="floatingEmail">Почта</label>
            </div>
            <div class="form-floating">
                <Field
                    name="password"
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    rules="required|min:5"
                />
                <ErrorMessage class="error-message text-danger position-absolute" name="password"/>
                <label for="floatingPassword">Пароль</label>
            </div>
            <div class="form-floating">
                <Field
                    name="password_confirmation"
                    type="password"
                    class="form-control"
                    id="password_confirmation"
                    placeholder="Password"
                    rules="required|confirmed:@password"
                />
                <ErrorMessage class="error-message text-danger position-absolute" name="passwordConfirmation"/>
                <label for="password_confirmation">Подтвердите пароль</label>
            </div>
            <button
                class="form-button w-100 btn btn-lg btn-success mb-2 position-relative"
                type="submit"
                :disabled="getRegisterUser.loading"
            >
                <Loader class="spin" v-if="getRegisterUser.loading"/>
                <span v-else>Регистрация</span>
            </button>

            <router-link
                to="/auth"
                type="submit"
            >
                Вход
            </router-link>
            <p class="mt-3 mb-3 text-muted">© Maksim Barabanshikov</p>
        </Form>
    </div>
    <div v-if="!!getRegisterUser.error" class="form-alert alert alert-danger position-absolute m-0" role="alert">
        {{ getRegisterUser.error }}
    </div>
</template>

<script>
import {Form, Field, ErrorMessage, defineRule} from 'vee-validate'
import Loader from "../../components/Loader";
import axios from "axios";
import {mapActions, mapGetters} from "vuex";

defineRule("required", value => {
    if (!value) {
        return "Обязательное поле";
    }

    return true;
});

defineRule("min", (value, [min]) => {
    if (value && value.length < min) {
        return `Пароль должен содержать не менее ${min} символов  `;
    }

    return true;
});

defineRule("confirmed", (value, [other]) => {
    if (value !== other) {
        return `Пароли не совпадают`;
    }

    return true;
});

defineRule('email', value => {
    // if the field is not a valid email
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(value)) {
        return 'Такая почта не действительна';
    }
    // All is good
    return true;
});

export default {
    name: "Regist",
    components: {
        Form,
        Field,
        ErrorMessage,
        Loader
    },
    methods: {
        ...mapActions([
            'REGISTER'
        ]),
        onSubmit(values) {
            this.REGISTER(values)
        },
    },
    computed: {
        ...mapGetters([
            'getRegisterUser'
        ])
    }
}
</script>

<style>
.form-signin {
    max-width: 330px;
    padding: 15px;
}

.form-floating {
    margin-bottom: 10px;
    position: relative;
    padding-bottom: 20px;

}

.form-floating .error-message {
    bottom: 0;
    left: 10px;
    font-size: 12px;
}

.form-alert {
    bottom: 90px;
    right: 30px;
}

.form-button {
    height: 46px;
}

.spin {
    transform: translate(-50%, -50%);
    font-size: 16px;
}

</style>
