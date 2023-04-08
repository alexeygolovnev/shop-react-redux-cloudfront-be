import { Config } from 'jest';

const config: Config = {
    verbose: true,
    transform: {
        '^.+\\.ts?$': 'esbuild-jest',
    },
    clearMocks: true,
    moduleNameMapper: {
        '^@Utils(.*)$': "<rootDir>/src/utils$1",
        '^@Db(.*)$': "<rootDir>/src/db$1",
        '^@Types(.*)$': "<rootDir>/src/types$1",
        '^@Mocks(.*)$': "<rootDir>/src/mocks$1",
        '^@Models(.*)$': "<rootDir>/src/models$1",
        '^@Functions(.*)$': "<rootDir>/src/functions$1",
    }
}

export default config;
