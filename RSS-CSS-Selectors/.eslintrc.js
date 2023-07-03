module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        'plugin:prettier/recommended'
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": "./tsconfig.json",
        "tsconfigRootDir": __dirname
    },
    "plugins": [
        "@typescript-eslint",
        'prettier'
    ],
    "rules": {
        "@typescript-eslint/no-explicit-any": 'error',
        "@typescript-eslint/no-inferrable-types": 'off',
        "@typescript-eslint/explicit-member-accessibility": [
            'error',
            {
                accessibility: 'explicit',
                overrides: {
                  accessors: 'explicit',
                  constructors: 'off',
                  methods: 'explicit',
                  properties: 'explicit',
                  parameterProperties: 'explicit',
                },
            }
        ],
        'prettier/prettier': 'error',
    },
    ignorePatterns: ['.eslintrc.js', 'webpack.config.js', 'jest.config.js'],
}
