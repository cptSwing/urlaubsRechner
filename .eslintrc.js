module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier",
    ],
    ignorePatterns: [".eslintrc.js"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
    },
    plugins: ["@typescript-eslint"],
    root: true,
    rules: {
        "@typescript-eslint/no-unused-vars": [
            "warn",
            {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_ignored",
            },
        ],
        "no-console": ["warn"],
        "no-empty": ["warn"],
        "object-shorthand": ["warn"],
    },
};
