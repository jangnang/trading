module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/airbnb', '@vue/typescript/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 0,
    'no-restricted-syntax': 0,
    'no-param-reassign': 0,
    'no-undef': 0,
    'import/prefer-default-export': 0,
    'no-shadow': 0,
    'no-prototype-builtins': 0,
    'no-bitwise': 0,
  },
};
