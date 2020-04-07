const jestConfig = {
  setupFiles: ['./jest.setup.js'],
  clearMocks: true,
  coveragePathIgnorePatterns: [
    'jest.setup.js',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};

module.exports = jestConfig;
