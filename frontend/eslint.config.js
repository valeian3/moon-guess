import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const baseConfig = {
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    globals: globals.browser,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};

export default [
  {
    ignores: ['eslint.config.js'], // Ignore eslint.config.js
  },
  // TypeScript Configuration
  {
    ...baseConfig,
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react': react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      ...baseConfig.languageOptions,
      parser: tsParser,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  // JavaScript Configuration
  {
    ...baseConfig,
    files: ['**/*.js'],
    rules: {
      ...js.configs.recommended.rules,
    },
  },
];
