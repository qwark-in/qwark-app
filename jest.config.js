module.exports = {
  preset: "jest-expo",
  moduleNameMapper: {
    "^test-utils$": "<rootDir>/tests/test-utils.tsx", // ✅ map test-utils
  },
};
