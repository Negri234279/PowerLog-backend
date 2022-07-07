module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ['standard', 'prettier'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'indent': [
            'error',
            'spaces'
        ],
        'linebreak-style': [
            'error',
            'windows'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ]
    }
}