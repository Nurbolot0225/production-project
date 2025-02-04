module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true
    },
    extends: [
        'standard-with-typescript',
        'plugin:react/recommended',
        'plugin:i18next/recommended'
    ],
    overrides: [
        {
            env: {
                node: true
            },
            extends: ['plugin:@typescript-eslint/disable-type-checked'],
            files: [
                '.eslintrc.{js,cjs,tsx}'
            ],
            parserOptions: {
                sourceType: 'script'
            }
        },
        {
            files: ['**/src/**/*.test.{ts,tsx}'],
            rules: {
                'i18next/no-literal-string': 'off'
            }
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        tsconfigRootDir: __dirname
    },
    plugins: [
        'react',
        'import',
        'i18next',
        'react-hooks'
    ],
    rules: {
        'sort-imports': ['error', { ignoreCase: true, ignoreDeclarationSort: true }],
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
                        position: 'before'
                    },
                    {
                        pattern: '@src/**',
                        group: 'internal'
                    }
                ],
                pathGroupsExcludedImportTypes: ['internal', 'react'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true
                }
            }
        ],
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        indent: [2, 4],
        'max-len': [
            'error',
            {
                code: 120,
                ignoreComments: true
            }
        ],
        'no-undef': 'off',
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'no-console': 'warn',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/function-component-definition': 'off',
        'react/display-name': 'off',
        'no-shadow': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        'react/no-deprecated': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/no-confusing-void-expression': 'off',
        // '@typescript-eslint/consistent-type-imports': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-dynamic-delete': 'off',
        '@typescript-eslint/no-invalid-void-type': 'off',
        '@typescript-eslint/no-explicit-any': ['warn', { ignoreRestArgs: true }],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                args: 'all',
                argsIgnorePattern: '^_',
                caughtErrors: 'all',
                caughtErrorsIgnorePattern: '^_',
                destructuredArrayIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                ignoreRestSiblings: true
            }
        ],
        'i18next/no-literal-string': [
            'error',
            {
                markupOnly: true, ignoreAttribute: ['data-testid', 'to', 'target']
            }
        ]
    },
    globals: {
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true
    }
}
