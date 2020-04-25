# Hello, v2 World!

## Setting up

### 1. Update packages with `asdf`:

```bash
$ brew upgrade asdf
$ asdf plugin update --all
```

### 2. Update relevant packages:

```bash
$ asdf install nodejs latest
$ asdf install yarn latest
$ asdf local nodejs ${version}
$ asdf local yarn ${version}
```

### 3. Initialize the project:

```bash
$ npx create-next-app my-site
```

### 4. Relocate the old site

I had a much earlier version of the site still public that just used static HTML, CSS, and JS. I moved this site to the folder `public/v1`. I then ran `yarn dev` and made sure I could access `localhost:3000/v1/index.html` to verify it was still working, and it was!

### 5. Establish basic tooling

#### asdf

```bash
$ asdf local nodejs 13.13.0
```

Creates your `.tool-versions` file.

#### Editorconfig

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
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
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
    "isolatedModules": true,
    "jsx": "preserve"
  },
  "exclude": [
    "node_modules"
  ],
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx"
  ]
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
$ yarn add --dev eslint-plugin-jsdoc eslint-plugin-lodash eslint-plugin-react-hooks eslint-plugin-import prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-babel
```

Baseline `.eslintrc.js` configuration with airbnb recommended rules, plugins,
TypeScript support, prettier reporting, extensive JSDoc enforcement, and known
rule preferences:

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
    'jsdoc/check-indentation': [1, { excludeTags: ['notes'] }],
    'jsdoc/check-param-names': 1, // Recommended
    'jsdoc/check-property-names': 0,
    'jsdoc/check-syntax': 0,
    'jsdoc/check-tag-names': [1, { definedTags: ['notes'] }], // Recommended
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
          // Require JSDoc on any exported type
          'ExportNamedDeclaration TSInterfaceDeclaration',
          'ExportNamedDeclaration TSTypeAliasDeclaration',
          'ExportNamedDeclaration TSEnumDeclaration',
          // Require JSDoc on exported type literal object properties, but
          // exclude brand property on branded types
          'ExportNamedDeclaration TSTypeAliasDeclaration TSPropertySignature:not([key.name="__brand"])',
          // Require JSDoc on component props
          'TSTypeAliasDeclaration[id.name=/.*Props$/] TSPropertySignature',
          // Require JSDoc on exported literal objects and their properties
          'ExportNamedDeclaration ObjectExpression',
          'ExportNamedDeclaration ObjectExpression Property',
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
        ignoreUrls: true,
      },
    ],
    'no-unused-expressions': 0, // Misfires with optional chaining, prefer babel plugin rule
    'sort-keys': 'error',
  },
};
```

And `.eslintignore`:
```
*.d.ts
```

And `.prettierrc`:

```json
{
  "arrowParens": "always",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "printWidth": 90,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all"
}
```

#### Stylelint

Add stylelint, a good chunk of plugins, and sass configuration.

```bash
$ yarn add --dev stylelint stylelint-config-sass-guidelines stylelint-config-standard stylelint-declaration-strict-value stylelint-no-indistinguishable-colors stylelint-order stylelint-prettier stylelint-suitcss stylelint-value-no-unknown-custom-properties
```

My `.stylelintrc.json`:

```json
{
  "extends": ["stylelint-config-standard", "stylelint-config-sass-guidelines"],
  "ignoreFiles": ["public/v1/**/*", ".vscode/**/*"],
  "plugins": [
    "stylelint-declaration-strict-value",
    "stylelint-no-indistinguishable-colors",
    "stylelint-order",
    "stylelint-prettier",
    "stylelint-suitcss",
    "stylelint-value-no-unknown-custom-properties"
  ],
  "rules": {
    "order/order": [
      "custom-properties",
      "dollar-variables",
      "declarations",
      "at-rules",
      "rules"
    ],
    "csstools/value-no-unknown-custom-properties": true,
    "custom-property-pattern": "^[a-z][a-z0-9-]+$",
    "order/properties-alphabetical-order": true,
    "plugin/stylelint-no-indistinguishable-colors": true,
    "scale-unlimited/declaration-strict-value": ["/color/", "font-size", "font-family"],
    "selector-class-pattern": "^[a-z][a-z0-9-]+$",
    "selector-max-id": 2,
    "suitcss/custom-property-no-outside-root": true,
    "suitcss/root-no-standard-properties": true,
    "suitcss/selector-root-no-composition": true
  }
}
```

## Static Site Infrastructure

https://nextjs.org/blog/next-9-3#next-gen-static-site-generation-ssg-support

Up first, I set up the core static pages and the components + hooks to support
them. In Nextjs, this is as easy as dropping a file in `/pages` per static site
page.

By placing the actual screen content inside an outer `Screen` component as its
children, I am able to easily render the navigation menus on every screen from a
single component:

```tsx
// pages/about-me.tsx
import React, { FC } from 'react';
import Screen from '../common/components/Screen';

const AboutMeScreen: FC<AboutMeScreenProps> = () => {
  return (
    <Screen
      activePage="about-me"
      contentSections={
        ABOUT_ME_SECTIONS
        // A structured representation of the content on the current
        // screen that is used to build out the side navigation menu
      }
    >
      <h1>Welcome to my Site!</h1>
      {/* Rest of the page content */}
    </Screen>
  );
};

export default AboutMeScreen;

// common/components/Screen.tsx
import React, { FC } from 'react';

type ScreenProps = { /** ... */ };

const Screen: FC<ScreenProps> = ({ activePage, children, contentSections }) => {
    return (
      <div className="full-width full-height flex-row non-scrollable">
        <MainNavMenu activePage={activePage} />
        <main className="flex-1 flex-column scrollable-y">
          {children}
        </main>
        <SideNavMenu />
      </div>
    );
  },
);

export default Screen;
```

After dumping in a healthy amount of Lorem Ipsum, it was off to the races!

## First features

### Responsiveness

Developing mobile-first means setting up a system of display sizes and ways of
responding to them early, which I've done in a strongly-typed, modern React
fashion using a dictionary `as const` and a `useDisplaySize()` hook to control
component rendering:

```ts
// constants/breakpoint-sizes.ts
import values from 'lodash/values';

export const BREAKPOINT_SIZES = {
  MOBILE: 0,
  SMALL: 768,
  MEDIUM: 1024,
  LARGE: 1200,
} as const;

export type DisplaySize = keyof typeof BREAKPOINT_SIZES;
// 'MOBILE' | 'SMALL' | 'MEDIUM' | 'LARGE'
```

The `useDisplaySize()` hook I wrote checks the window width against the
pre-defined breakpoints and returns the `DisplaySize` to match it. These
breakpoints represent minimum widths, so if the window width was 800, the value
returned by the hook would be `'SMALL'`.

For purely scale-based responsiveness such as font size or padding/margin, I
will rely on corresponding media queries and pure sass stylesheets, but for
elements on the page that would otherwise be taking up valuable computational
resources on mobile devices, such as the navigation menus, the
`useDisplaySize()` hook proves the ideal strategy to prevent them from rendering
altogether.

### Section tracking in navigation side menu


