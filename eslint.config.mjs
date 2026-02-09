import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files:["**/*.{js,mjs,cjs}"],
        plugins: { js },
        extends: ["js/recommended"],
        ignores: ["dist/*", "coverage/*", "webpack.*.js"],
        languageOptions: { globals: globals.browser }
    },
])