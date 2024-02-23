// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "node",
// };

// import type { JestConfigWithTsJest } from "ts-jest";

// const jestConfig: JestConfigWithTsJest = {
//   // [...]
//   transform: {
//     // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
//     // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
//     // "^.+\\.tsx?$": [
//     "^.+\\.[tj]sx?$": [
//       "ts-jest",
//       {
//         // ts-jest configuration goes here
//       },
//     ],
//   },
// };

import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // Setup Enzyme (if using Enzyme)
  // snapshotSerializers: ['enzyme-to-json/serializer'],
  // setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};

export default config;
