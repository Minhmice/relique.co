import { config } from "@repo/eslint-config/react-internal";

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    rules: {
      "react/prop-types": "off", // TypeScript handles prop validation
      "@typescript-eslint/no-explicit-any": "warn", // Allow any for now in data-table
    },
  },
];
