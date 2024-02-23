import { describe, expect, it, jest } from "@jest/globals";
import { testSum } from "../controllers/productController";

const testCases = [
  {
    input: {
      num1: 1,
      num2: 2,
    },
    output: 3,
  },
  {
    input: {
      num1: -1,
      num2: 2,
    },
    output: 1,
  },
  {
    input: {
      num1: -5,
      num2: -3,
    },
    output: -8,
  },
  {
    input: {
      num1: 0,
      num2: 0,
    },
    output: 0,
  },
  {
    input: {
      num1: 100,
      num2: 200,
    },
    output: 300,
  },
  {
    input: {
      num1: 55,
      num2: 45,
    },
    output: 100,
  },
  {
    input: {
      num1: 1.5,
      num2: 2.5,
    },
    output: 4,
  },
  {
    input: {
      num1: -100,
      num2: 50,
    },
    output: -50,
  },
  {
    input: {
      num1: 999,
      num2: 1,
    },
    output: 1000,
  },
  {
    input: {
      num1: 0.1,
      num2: 0.2,
    },
    output: 0.3,
  },
];

describe("Test sum function", () => {
  it.each(testCases)("success case - $", ({ input, output }) => {
    const { num1, num2 } = input;
    expect(testSum(num1, num2)).toBe(output);
  });
});
