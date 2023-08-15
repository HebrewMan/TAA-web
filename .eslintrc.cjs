module.exports = {
  env: { browser: true, es2021: true, node: true },
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  files: ["*.ts", "*.tsx", "*.scss"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  rules: {
    "react-refresh/only-export-components": "warn",
    "no-undef": "off",
    "@typescript-eslint/no-explicit-any": "off", // 禁止使用 any 类型
    "@typescript-eslint/no-unused-vars": "off", // 禁止定义未使用的变量
    "@typescript-eslint/no-empty-function": "off",
  },
};
