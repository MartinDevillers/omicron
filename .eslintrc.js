module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'airbnb-typescript',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
        'plugin:import/typescript'
    ],
    env: {
        browser: true,
        node: true,
        es6: true
    },
    plugins: ['@typescript-eslint', 'prettier', 'react-hooks'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports,
        project: './tsconfig.json',
    },
    rules: {
        // "linebreak-style": 0,
        "no-param-reassign": [2, { "props": false }],
        "no-plusplus": 0,
        "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
        "react/display-name": 0,
        "react/jsx-filename-extension": [ 1, { "extensions": [".tsx"] } ],
        "react/jsx-one-expression-per-line": 0,
        "react/jsx-props-no-spreading": 0,
        "react/prop-types": 'off', // Disable prop-types as we use TypeScript for type checking
        "@typescript-eslint/explicit-function-return-type": 'off',
        "lines-between-class-members": ["error", "always", { "exceptAfterSingleLine": true }],
        "class-methods-use-this": ["error", { "exceptMethods": ["swap"] }],
        "no-constant-condition": ["error", { "checkLoops": false }],
        "prettier/prettier": [
            "error",
            {
                trailingComma: "es5",
                semi: false,
                singleQuote: false,
                printWidth: 120,
                endOfLine: "auto"
            }
        ]
    }
};