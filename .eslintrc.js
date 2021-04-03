module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'standard',
    'plugin:mocha/recommended',
  ],
  plugins: ['mocha'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    eqeqeq: 0,
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-ex-assign': 0,
  },
}
