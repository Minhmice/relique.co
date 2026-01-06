import { nextJsConfig } from "@repo/eslint-config/next-js";
import { boundariesConfig } from "@repo/eslint-config/boundaries";

/** @type {import("eslint").Linter.Config[]} */
export default [...nextJsConfig, ...boundariesConfig];
