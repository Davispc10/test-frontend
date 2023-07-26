// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('node:path')

/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  ignorePatterns: ['node_modules/', '.next/', 'build/'],
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'eslint-plugin-import-helpers',
    'jsx-a11y',
    'import',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: path.join(__dirname, 'tsconfig.json'),
  },
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@testing-library/*'],
            message: 'Please use @/test/test-utils instead.',
          },
          {
            group: ['tailwind-merge'],
            message: 'Please use @/lib/utils instead.',
          },
          {
            group: ['lucide-react'],
            message: 'Please use @/components/icons instead.',
          },
        ],
      },
    ],
    'import/no-anonymous-default-export': 'off',
    'import/no-duplicates': 'error',
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          ['/^react$/'],
          ['module'],
          ['/^@//'],
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: {
          order: 'asc',
          ignoreCase: true,
        },
      },
    ],

    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: [
          'multiline-block-like',
          'multiline-const',
          'multiline-expression',
        ],
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: [
          'multiline-block-like',
          'multiline-const',
          'multiline-expression',
          'switch',
          'return',
        ],
      },
      {
        blankLine: 'never',
        prev: 'case',
        next: 'multiline-block-like',
      },
      {
        blankLine: 'never',
        prev: 'multiline-block-like',
        next: 'case',
      },
    ],
    'no-console': [
      'error',
      {
        allow: ['error', 'warn'],
      },
    ],
    'prefer-const': 'error',
    'no-return-await': 'error',
    'require-await': 'error',

    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unused-prop-types': 'error',
    'react/self-closing-comp': 'warn',
    'react/jsx-curly-brace-presence': [
      'error',
      {
        props: 'never',
        children: 'never',
        propElementValues: 'always',
      },
    ],
    'react/hook-use-state': 'warn',
    'react/jsx-boolean-value': 'warn',
    'react/jsx-fragments': 'warn',
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-no-target-blank': 'warn',
    'react/jsx-no-useless-fragment': 'warn',
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-ignore': 'allow-with-description',
      },
    ],
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'allow-as-parameter',
      },
    ],
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/consistent-indexed-object-style': 'error',
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
  },
  overrides: [
    {
      files: ['*.spec.tsx', '*.test.tsx'],
      extends: ['plugin:testing-library/react'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
}

module.exports = config
