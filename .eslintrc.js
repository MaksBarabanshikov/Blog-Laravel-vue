module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    withDefaults: "readonly",
  },
  extends: [
    "@vue/typescript/recommended",
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "prettier",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 2022,
  },
  plugins: [],
  rules: {
    "vue/no-reserved-component-names": "warn",
  },
};
