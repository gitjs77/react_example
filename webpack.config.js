var path = require('path');
var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: [
        'react-hot-loader/patch',
        './src/index.tsx'
    ],
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ],
        unsafeCache: true
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new WebpackNotifierPlugin({ alwaysNotify: true }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html'
        }),

        new ExtractTextPlugin({
            filename: '[name]/styles.css',
            disable: true
        })
    ],

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    { loader: 'react-hot-loader/webpack' },
                    { loader: 'awesome-typescript-loader' }
                ],
                exclude: /node_modules/,
                include: path.resolve(__dirname, "src")
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },

            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.(ttf|eot|svg|woff2?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader'
            }
        ]
    },

    devtool: "eval-source-map",

    devServer: {
        hot: true,
        historyApiFallback: true,
        port: 3001,

        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                secure: false
            }
        }
    }
};
