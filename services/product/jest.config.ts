import { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.paths.json';

const config: Config = {
    verbose: true,
    transform: {
        '^.+\\.ts?$': 'esbuild-jest',
    },
    testEnvironment: 'node',
    roots: ['<rootDir>'],
    clearMocks: true,
    modulePaths: [compilerOptions.baseUrl],,
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
}

export default config;
