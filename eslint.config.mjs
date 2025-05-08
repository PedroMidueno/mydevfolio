// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt()
  .prepend({
    ignores: ['**/*.config.*']
  })
  .override('nuxt/vue/rules', {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': ['warn', {
        'singleline': {
          'max': 3
        },      
        'multiline': {
          'max': 1
        }
      }]
    }
  })
  .override('nuxt/typescript/rules', {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  })
  .override('nuxt/stylistic', {
    rules: {
      '@stylistic/eol-last': 'error',
      '@stylistic/no-multiple-empty-lines': 'error',
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/arrow-spacing': 'error',
      '@stylistic/function-call-spacing': ['error', 'never'],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/block-spacing': 'error',
      '@stylistic/object-curly-spacing': [
        'error',
        'always',
        { arraysInObjects: true, objectsInObjects: true }
      ],
      '@stylistic/indent': ['error', 2],
      '@stylistic/array-bracket-newline': ['error', 'consistent'],
      '@stylistic/max-len': ['error', { code: 200, ignoreRegExpLiterals: true }],
      '@stylistic/key-spacing': 'error',
      '@stylistic/space-infix-ops': 'error',
      '@stylistic/dot-location': ['error', 'property'],
      '@stylistic/space-in-parens': ['error', 'never'],
      '@stylistic/keyword-spacing': 'error',
      '@stylistic/space-before-blocks': 'error',
      '@stylistic/type-annotation-spacing': 'error',
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }]
    }
  })