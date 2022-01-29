/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    // "@vue/eslint-config-prettier", // plugin も含まれているが不要なので無効化
    "eslint-config-prettier", // ↑ の代わりにこれを使う
  ],
  env: {
    "vue/setup-compiler-macros": true,
  },
  overrides: [
    {
      // eslint:recommended のルールを無効化
      // @typescript-eslint/eslint-recommended だと .ts, .tsx のみなので .vue にも適用
      files: ["*.vue"],
      rules:
        require("@typescript-eslint/eslint-plugin/dist/configs/eslint-recommended")
          .overrides[0].rules,
    },
  ],
};
