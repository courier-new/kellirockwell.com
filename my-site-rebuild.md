# Hello, v2 World!

## Steps of the Process

### Update packages with `asdf`:

```bash
$ brew upgrade asdf
$ asdf plugin update --all
```

### Update relevant packages:

```bash
$ asdf install nodejs latest
$ asdf install yarn latest
$ asdf local nodejs ${version}
$ asdf local yarn ${version}
```

### Initialize the project:

```bash
$ npx create-next-app my-site
```

### Relocate the old site

I had a much earlier version of the site still public that just used static HTML, CSS, and JS. I moved this site to the folder `public/v1`. I then ran `yarn dev` and made sure I could access `localhost:3000/v1/index.html` to verify it was still working, and it was!

### Establish basic tooling

#### `.editorconfig`

```properties
# https://editorconfig.org/#download
# Many editors have native support for EditorConfig, and most that don't have a plugin

# No EditorConfig file above the root directory
root = true

# Unix-style newlines with a newline ending every file
[*]
end_of_line = lf
insert_final_newline = true

# Set default charset
charset = utf-8

# 2 space indentation
indent_style = space
indent_size = 2

# Trim trailing whitespace on lines except for files where it might be intentional
trim_trailing_whitespace = true
[*.{json,yml,md,eslintrc.js}]
trim_trailing_whitespace = false

```

#### TypeScript

```bash
$ yarn add --dev typescript @types/react @types/node
$ touch tsconfig.json
```

Running `yarn dev` at this point will detect TypeScript and populate the
`tsconfig.json` with its default values. There are a couple of these we
deliberately change:

```diff
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
-   "strict": false,
+   "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true
  },
  "exclude": ["node_modules"],
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"]
}

```

#### ESLint + Prettier

https://eslint.org/docs/user-guide/getting-started

```bash
$ yarn add --dev eslint
$ npx eslint --init
```

Add relevant plugins.

```bash
$ yarn add --dev eslint-plugin-jsdoc eslint-plugin-lodash eslint-plugin-react-hooks eslint-plugin-import prettier eslint-config-prettier eslint-plugin-prettier
```

Baseline `.eslintrc.js` configuration with airbnb recommended rules, plugins, TypeScript
support, prettier reporting, and known rule preferences:

```javascript
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
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'jsdoc', 'lodash', 'prettier'],
  rules: {
    // @typescript-eslint-plugin
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    // eslint-plugin-jsdoc
    'jsdoc/check-access': 1, // Recommended
    'jsdoc/check-alignment': 1, // Recommended
    'jsdoc/check-examples': 1,
    'jsdoc/check-indentation': 1,
    'jsdoc/check-param-names': 1, // Recommended
    'jsdoc/check-properties': 0,
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
    'jsdoc/require-file-overview': 1,
    'jsdoc/require-hyphen-before-param-description': [0, 'never'],
    'jsdoc/require-jsdoc': 0, // Recommended
    'jsdoc/require-param-description': 1, // Recommended
    'jsdoc/require-param-name': 1, // Recommended
    'jsdoc/require-param-type': 0, // Turned off b/c using TS
    'jsdoc/require-param': 1, // Recommended
    'jsdoc/require-property': 0,
    'jsdoc/require-property-description': 0,
    'jsdoc/require-property-name': 0,
    'jsdoc/require-property-type': 0,
    'jsdoc/require-returns-check': 1, // Recommended
    'jsdoc/require-returns-description': 1, // Recommended
    'jsdoc/require-returns-type': 0, // Turned off b/c using TS
    'jsdoc/require-returns': 1, // Recommended
    'jsdoc/valid-types': 0, // Turned off b/c using TS
    // eslint-plugin-react
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    // eslint-plugin-react-hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // prettier plugin
    'prettier/prettier': 'warn',
    // Base ESLint rules
    'max-len': [
      'warn',
      {
        code: 90,
        ignoreComments: false,
        ignoreStrings: true,
      },
    ],
    'sort-keys': 'error',
    'sort-imports': 'error',
  },
};
```

And `.prettierrc`:

```json
{
  "arrowParens": "always",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "printWidth": 100,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all"
}
```

### Start building out static site infrastructure

https://nextjs.org/blog/next-9-3#next-gen-static-site-generation-ssg-support

Below is an example of JSX embedded in Markdown. <br /> **Try and change
the background color!**

```tsx
/**
 * @file View for "About Me" screen
 */
import React, { FC } from 'react';

const Screen: FC = () => <div>hello</div>;

export const getStaticProps = async (_context) => {
  return {
    fallback: false,
    paths: [],
  };
};

export default Screen;
```

<!-- <div style={{ padding: "20px", backgroundColor: "tomato" }}>
  <h3>This is JSX</h3>
</div> -->
