import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    moduleFileExtensions: [
        "ts",
        "js",
    ],
    transform: {
        "^.+\\.ts$": "ts-jest",
    },
    globals: {
        "ts-jest": {
            "tsConfig": "tsconfig.json",
        },
    },
};

export default config;