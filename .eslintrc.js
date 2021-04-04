module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'standard',
    'plugin:mocha/recommended',
  ],
  plugins: ['mocha', 'no-autofix'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    eqeqeq: 'off',
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-ex-assign': 'off',
    'no-unused-expressions': 'warn',
    'no-unused-vars': 'warn',
    'no-unreachable': 'warn',
  },
}
