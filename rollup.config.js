import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";

const extensions = [".js"];

const name = "jasminePixelmatch";

export default [
  {
    input: "./src/index.js",
    plugins: [
      resolve({ extensions }),
      commonjs(),
      babel({ extensions, include: ["src/**/*"] })
    ],
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true
      },
      {
        file: pkg.module,
        format: "es",
        sourcemap: true
      },
      {
        name,
        file: pkg.browser,
        format: "iife",
        sourcemap: true
      }
    ]
  }
];
