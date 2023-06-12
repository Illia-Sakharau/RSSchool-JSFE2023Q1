module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
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
    }
}
