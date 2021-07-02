import { Configuration } from "webpack";

const NodeExternals = require("webpack-node-externals");

const config: Configuration = {
    mode: "development",
    entry: "./src/index.ts",
    output: {
        path: `${__dirname}/dist`,
        filename: "index.js",
    },
    target: "node",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: "tsconfig.json",
                        }
                    }
                ],
            },
        ],
    },
    resolve: {
        extensions: [
            ".ts", ".js"
        ]
    },
    externals: [
        NodeExternals()
    ]
};

export default config;
