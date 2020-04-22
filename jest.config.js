module.exports = {
  setupFilesAfterEnv: ['<rootDir>/testlib/test-setup.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^hooks/([^\\.]*)$': '<rootDir>/src/frontend/hooks/$1',
    '^components/([^\\.]*)$': '<rootDir>/src/frontend/components/$1',
    '^styles/([^\\.]*)$': '<rootDir>/src/frontend/styles/$1',
    '^lib/([^\\.]*)$': '<rootDir>/src/frontend/lib/$1',
    '^testlib/([^\\.]*)$': '<rootDir>/testlib/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/testlib/fileMock.ts',
    '\\.(css|less)$': '<rootDir>/testlib/styleMock.ts',
  },
};
