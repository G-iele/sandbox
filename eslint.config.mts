import path from "node:path";
import { fileURLToPath } from "node:url";

import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import react from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tsEslint from "typescript-eslint";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

export default tsEslint.config([
  {
    ignores: ["**/dist", "**/node_modules", "**/.yarn"],
  },
  js.configs.recommended,
  tsEslint.configs.recommended,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      prettier,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        tsconfigRootDir: _dirname,
        project: ["./tsconfig.json", "./app/tsconfig*.json", "./tsconfig.base.json"],
      },
    },

    rules: {
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      curly: ["error", "all"],
      "@typescript-eslint/no-explicit-any": "off",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
      "@typescript-eslint/no-floating-promises": [
        "warn",
        {
          checkThenables: true,
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    name: "custom-react",
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts}"],
    ...react.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      ...react.configs.flat.recommended.plugins,
      "react-hooks": eslintPluginReactHooks,
      "react-refresh": reactRefresh,
    },
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
      ],
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-curly-brace-presence": [
        "error",
        {
          props: "never",
          children: "always",
        },
      ],
    },
  },
  eslintPluginPrettierRecommended,
]);
