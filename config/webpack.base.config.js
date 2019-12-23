'use strict'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const {CleanWebpackPlugin} = require("clean-webpack-plugin");
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const webpackConfig = {
    mode: 'development',
    context: path.resolve(__dirname, '../'),
    entry: path.resolve(__dirname, "../src/index.js"),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "bundle.js",
        // 影响打包后的页面引用bundle.js带有前缀或公共路径
        publicPath: "/",
        //publicPath: "localhost:8080//assets/"
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'common': path.resolve(__dirname, '../src/common'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components'),
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../'),
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                /*options: {
                    transformAssetUrls: {
                        //自动require html中的静态资源文件，打包
                        video: ['src', 'poster'],
                        source: 'src',
                        img: 'src',
                        image: ['xlink:href', 'href'],
                        use: ['xlink:href', 'href']
                    }
                }*/
            },
            // {
            //     enforce: 'pre',
            //     test: /\.(js|vue)$/,
            //     loader: 'eslint-loader',
            //     exclude: /node_modules/
            // },
            {
                test:/(\.jsx|\.js)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 100,
                    name: '[name].[ext]',
                    esModule:false,
                    outputPath: 'images/',
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name]-[hash:7].[ext]',
                    esModule:false,
                    outputPath: 'movies/',
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]',
                    esModule:false,
                    outputPath: 'fonts/',
                }
            }
        ]
    },
    devtool: "eval-source-map",
    devServer: {
        publicPath: "/",
        //contentBase:path.join(__dirname,'../'),
        //contentBase: false,
        historyApiFallback: true,
        port: 8080,
        hot: true,
        inline: true,
        open:false,
        overlay: {
            errors:true,
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':  '"development"'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: "static",
                ignore: ['.*']
            }
        ]),
        //new CleanWebpackPlugin()
        new VueLoaderPlugin()
    ]
}

module.exports = webpackConfig
