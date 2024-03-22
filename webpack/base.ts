import TerserPlugin from "terser-webpack-plugin";
import { Configuration, BannerPlugin } from "webpack";
import { generateHeader } from "../plugins/userscript.plugin";

const config: Configuration = {
    entry: "./src/index.ts",
    target: "web",
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.m?ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    externals: {
        "@trim21/gm-fetch": "GM_fetch",
        "jquery": "jQuery"
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            terserOptions: {
                format: {
                    comments: true,
                },
                compress: true,
                mangle: true,
            },
            extractComments: false,
        })],
    },
    plugins: [
        new BannerPlugin({
            banner: generateHeader,
            raw: true,
        })
    ]
};

export default config;