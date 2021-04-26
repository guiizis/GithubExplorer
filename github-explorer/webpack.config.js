const path = require("path")
const WebpackHtmlPlugin = require("html-webpack-plugin")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")

const isDeveplopment = process.env.NODE_ENV != "production"

module.exports = {
    mode: isDeveplopment ? "development" : "production",
    devtool: isDeveplopment ? "eval-source-map" : "source-map",
    entry: path.resolve(__dirname, "src", "index.jsx"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"

    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "public"),
        hot: true
    },
    plugins: [
        isDeveplopment && new ReactRefreshWebpackPlugin(),

        new WebpackHtmlPlugin({
            template: path.resolve(__dirname, "public", "index.html")
        })
    ].filter(Boolean)

    ,
    module: {
        rules: [
            {

                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        plugins: [
                            isDeveplopment && require.resolve("react-refresh/babel")
                        ].filter(Boolean)
                    }
                }
            },
            {

                test: /\.scss$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    }

}