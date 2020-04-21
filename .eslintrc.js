module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/eslint-recommended',
    // Configuration provided by typescript-eslint which disables a few of the
    // recommended rules from the previous set that we know are already covered
    // by TypeScript's typechecker
    'plugin:@typescript-eslint/recommended',
    // typescript-eslint's "recommended" config -- just like eslint/recommended
    // or react-recommended except it only turns on rules from our TypeScript-
    // specific plugin.
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:lodash/recommended',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'babel',
    'react-hooks',
    '@typescript-eslint',
    'jsdoc',
    'lodash',
    'prettier',
  ],
  rules: {
    // @typescript-eslint-plugin
    '@typescript-eslint/no-unused-expressions': 0, // Misfires with optional chaining, prefer babel plugin rule
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-use-before-define': 0,
    // eslint-plugin-babel
    'babel/no-unused-expressions': 1,
    // eslint-plugin-jsdoc
    'jsdoc/check-access': 1, // Recommended
    'jsdoc/check-alignment': 1, // Recommended
    'jsdoc/check-examples': 1,
    'jsdoc/check-indentation': 1,
    'jsdoc/check-param-names': 1, // Recommended
    'jsdoc/check-property-names': 0,
    'jsdoc/check-syntax': 0,
    'jsdoc/check-tag-names': 1, // Recommended
    'jsdoc/check-types': 0, // Turned off b/c using TS
    'jsdoc/check-values': 0,
    'jsdoc/empty-tags': 1, // Recommended
    'jsdoc/implements-on-classes': 0, // Recommended
    'jsdoc/match-description': 0,
    'jsdoc/newline-after-description': 1, // Recommended
    'jsdoc/no-types': 1, // Turned on b/c using TS
    'jsdoc/no-undefined-types': 0, // Turned off b/c using TS
    'jsdoc/require-description-complete-sentence': 0,
    'jsdoc/require-description': 1,
    'jsdoc/require-example': 0,
    'jsdoc/require-file-overview': 0,
    'jsdoc/require-hyphen-before-param-description': [0, 'never'],
    'jsdoc/require-jsdoc': [
      1,
      {
        require: {
          ArrowFunctionExpression: true,
          ClassDeclaration: true,
          ClassExpression: true,
          FunctionDeclaration: true,
          FunctionExpression: true,
          MethodDefinition: true,
        },
        contexts: [
          // https://eslint.org/docs/developer-guide/selectors
          // https://astexplorer.net/ with @typescript-eslint/parser selected
          'ExportNamedDeclaration TSInterfaceDeclaration',
          'ExportNamedDeclaration TSTypeAliasDeclaration',
          // Exclude brand property on branded types from types needing JSDoc
          'ExportNamedDeclaration TSTypeAliasDeclaration TSPropertySignature:not([key.name="__brand"])',
          'ExportNamedDeclaration TSEnumDeclaration',
          'TSTypeAliasDeclaration[id.name=/.*Props$/] TSPropertySignature',
        ],
      },
    ], // Recommended
    'jsdoc/require-param-description': 1, // Recommended
    'jsdoc/require-param-name': 1, // Recommended
    'jsdoc/require-param-type': 0, // Turned off b/c using TS
    'jsdoc/require-param': 1, // Recommended
    'jsdoc/require-property': 0,
    'jsdoc/require-property-description': 0,
    'jsdoc/require-property-name': 0,
    'jsdoc/require-property-type': 0,
    'jsdoc/require-returns-check': 0, // Turned off b/c using TS
    'jsdoc/require-returns-description': 0, // Turned off b/c using TS
    'jsdoc/require-returns-type': 0, // Turned off b/c using TS
    'jsdoc/require-returns': 0, // Turned off b/c using TS
    'jsdoc/valid-types': 0, // Turned off b/c using TS
    // eslint-plugin-react
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/prop-types': 0,
    // eslint-plugin-react-hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // eslint-plugin-imports
    'import/extensions': [1, 'never'],
    // prettier plugin
    'prettier/prettier': 'warn',
    // jsx-ally
    'jsx-a11y/anchor-is-valid': 0, // Prefer Next Link accessibility
    // Base ESLint rules
    'max-len': [
      'warn',
      {
        code: 90,
        ignoreComments: false,
        ignoreStrings: true,
      },
    ],
    'no-unused-expressions': 0, // Misfires with optional chaining, prefer babel plugin rule
    'sort-keys': 'error',
  },
};
