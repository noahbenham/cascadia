module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['import'],
  settings: {
    react: {
      pragma: 'React',
      version: '16.6'
    }
  },
  env: {
    jasmine: true,
    jest: true,
    browser: true
  },
  globals: {
    shallow: false,
    render: false,
    mount: false,
  },
  rules: {
    'function-paren-newline': ['error', 'consistent'],
    'operator-linebreak': ['error', 'before'],
    'react/sort-prop-types': ['error', true],
    'import/prefer-default-export': 'off', // Turn back on as project grows
    'implicit-arrow-linebreak': 'off',
    'react/destructuring-assignment': 'off',
    'prefer-object-spread': 2,
    'no-negated-condition': 2,
    'capitalized-comments': ['error', 'always', { 'ignoreConsecutiveComments': true }]
  }
};
