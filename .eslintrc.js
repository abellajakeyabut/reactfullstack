module.exports = {
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    commonjs: true,
    node: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react'],
  ignorePatterns: ['*.html', '*.ejs'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': [
      'warn',
      { allow: ['clear', 'info', 'error', 'dir', 'trace'] },
    ],
  },
};
