module.exports = {
  plugins: ['@typescript-eslint', 'jsx-a11y', 'import', 'prettier', 'unicorn'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:unicorn/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 12,
    sourceType: 'module',
  },
  env: {
    jest: true,
    browser: true,
    node: true,
    es2021: true,
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        vars: 'all',
        varsIgnorePattern: '^_',
      },
    ],
    'import/newline-after-import': 'error',
    'import/no-duplicates': ['error', { 'prefer-inline': false }],
    'import/no-unresolved': 'error',
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
        groups: [
          'builtin',
          'external',
          'internal',
          ['sibling', 'parent'],
          'index',
          'object',
          'type',
          'unknown',
        ],
        'newlines-between': 'always-and-inside-groups',
        pathGroups: [
          {
            group: 'external',
            pattern: 'react',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],
    'jsx-a11y/alt-text': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        depth: 5,
      },
    ],
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/no-onchange': 'off',
    'newline-before-return': 'error',
    'no-console': 'error',
    'no-const-assign': 'error',
    'no-debugger': 'error',
    'no-extra-semi': 'off',
    'no-param-reassign': 'error',
    'no-prototype-builtins': 0,
    'no-undef': 'error',
    'no-unexpected-multiline': 'error',
    'no-unused-vars': 'off',
    'object-curly-newline': [
      'error',
      {
        consistent: true,
      },
    ],
    'object-shorthand': 'error',
    'prefer-destructuring': [
      'error',
      {
        AssignmentExpression: {
          array: false,
          object: false,
        },
        VariableDeclarator: {
          array: false,
          object: true,
        },
      },
    ],
    'prefer-template': 'error',
    'unicorn/filename-case': 'off',
    'unicorn/no-nested-ternary': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/prevent-abbreviations': 'off',
  },
  ignorePatterns: ['node_modules/', 'dist/', '*.js', '*.cjs'],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
