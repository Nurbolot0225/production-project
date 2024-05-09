module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jest": true,
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended",
        "plugin:i18next/recommended",
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs,tsx}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "import",
        "i18next",
    ],
    "rules": {
        'sort-imports': ['error', {ignoreCase: true, ignoreDeclarationSort: true}],
        'import/order': [
            'error',
            {
                groups: [
                    ['external', 'builtin'], 'internal', ['sibling']
                ],
                pathGroups: [
                    {
                        pattern: 'react',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: '@src/**',
                        group: 'internal',
                    },
                ],
                pathGroupsExcludedImportTypes: ['internal', 'react'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
        "react/jsx-indent": [2, 4],
        "react/jsx-indent-props": [2, 4],
        "indent": [2, 4],
        "max-len": [
            'error',
            {
                "code": 100,
                ignoreComments: true
            }
        ],
        "react/jsx-filename-extension": [2, { extensions: [".js", ".jsx", ".tsx"] }],
        "import/no-unresolved": "off",
        "import/prefer-default-export": "off",
        "no-unused-vars": "warn",
        "no-console": "warn",
        "react/require-default-props": "off",
        "react/react-in-jsx-scope": "off",
        "react/jsx-props-no-spreading": "off",
        "react/function-component-definition": "off",
        "no-shadow": "off",
        "import/extensions": "off",
        "import/no-extraneous-dependencies": "off",
        "no-underscore-dangle": "off",
        "@typescript-eslint/indent": "off",
        "@typescript-eslint/prefer-nullish-coalescing": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/naming-convention": "off",
        "react/no-deprecated": "off",
        "i18next/no-literal-string": ['error', { markupOnly: true }],
    },
    "globals": {
        "__IS_DEV__": true,
    }
}
