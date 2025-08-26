export default {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src/__tests__"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json",
    },
  },
};
