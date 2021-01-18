const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: `${__dirname}/dist`
        // filename: '[name].[ext]'
    },
    resolve: {
        alias: {
            '@src': `${__dirname}/src`,
            '@components': `${__dirname}/src/components`,
            '@services': `${__dirname}/src/services`
        }
    },
    module: {
        rules: [
            {
                test: /.*\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            }
        ]
    },
    mode: 'development',
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
      }
}