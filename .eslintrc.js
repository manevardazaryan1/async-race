import js from '@eslint/js'
import ts from '@typescript-eslint/eslint-plugin'
import parserTs from '@typescript-eslint/parser'
import prettier from 'eslint-plugin-prettier'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'

export default [
  js.configs.recommended,
  ts.configs.recommended,

  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: parserTs,
    },
    plugins: {
      '@typescript-eslint': ts,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      prettier: prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
