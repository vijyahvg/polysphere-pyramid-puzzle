// jest.config.js
module.exports = {
    collectCoverageFrom: [
      'src/**/*.{js,jsx}',
      '!src/index.js',
      '!src/reportWebVitals.js',
      '!src/setupTests.js'
    ],
    coverageReporters: ['text', 'lcov', 'clover'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '^three$': '<rootDir>/src/__mocks__/three.js',
      '^@react-three/fiber$': '<rootDir>/src/__mocks__/@react-three/fiber.js',
      '^@react-three/drei$': '<rootDir>/src/__mocks__/@react-three/drei.js'
    },
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    transformIgnorePatterns: [
      'node_modules/(?!(@react-three|three)/)'
    ]
  };