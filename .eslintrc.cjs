/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  "overrides": [
    {
      "files": ["*.js", "*.spec.js", "*.vue"],
      "rules": {
        "vue/multi-word-component-names": "off",
        "vue/no-setup-props-destructure": "off"
      }
    }
  ]
}
