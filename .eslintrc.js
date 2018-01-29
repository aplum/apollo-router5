module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": ["eslint:recommended"],
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "comma-dangle": [
            "warn", "always-multiline"
        ],
        "indent": [
            "error", 4,
            {"SwitchCase": 1}
        ],
        "linebreak-style": [
            "error", "unix"
        ],
        "quotes": [
            "error", "single"
        ],
        "semi": [
            "error", "always"
        ],
        "no-unused-vars": ["warn"],
        "no-console": 0
    }
};
