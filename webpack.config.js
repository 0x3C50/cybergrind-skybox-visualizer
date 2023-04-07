const path = require("path");

module.exports = {
    entry: ["./src/index.js", "./dummyRequire.js"],
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif|html)$/i,
                type: 'asset/resource',
                loader: "file-loader",
                options: {
                    name: "[name].[ext]"
                }
                // loader: "file-loader?name=[name].[ext]"
            },
        ]
    }
}