import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import { FlatCompat } from '@eslint/eslintrc'
import prettierConfig from 'eslint-config-prettier'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const compat = new FlatCompat({ baseDirectory: __dirname })

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...compat.extends('airbnb-base'),
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettierConfig,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: './tsconfig.app.json',
      },
    },
    rules: {
      'no-console': 'warn',
      'no-magic-numbers': ['warn', { ignore: [0, 1, -1, 2, 7, 10, 100, 1000] }],
      'max-lines-per-function': ['warn', { max: 40 }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'import/order': 'off',
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-nested-ternary': 'off',
    },
  },
])