module.exports = {
    parser: "@typescript-eslint/parser",
    "env": {
        "es2021": true,
        "node": true
    },
    plugins: ["@typescript-eslint"],
    extends: [
        "plugin:@typescript-esint/recommended",
        "prettier/@typescript-eslint",
        "standard"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
    }
};
