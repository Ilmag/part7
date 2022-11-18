module.exports = {
    env: {
        browser: true,
        es6: true,
        'jest/globals': true
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: ['react', 'jest', 'cypress'],
    rules: {
        'no-console': 0,
        'react/prop-types': 0,
        'react/react-in-jsx-scope': 'off',
        'prettier/prettier': ['error', { endOfLine: 'auto' }]
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
}