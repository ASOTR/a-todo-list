'use strict'
const path = require('path')
// const {CleanWebpackPlugin} = require("clean-webpack-plugin");
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const baseWebpackConfig = {
    context: path.resolve(__dirname, '../'),
    entry: path.resolve(__dirname, "../src/index.js"),
    // output: {
    //     path: path.resolve(__dirname, '../dist'),
    //     filename: "js/bundle-[chunkhash].js",
    //     chunkFilename: 'js/[id].[chunkhash].js',
    //     // 影响打包后的页面引用bundle.js带有前缀或公共路径
    //     publicPath: "/",
    //     //publicPath: "localhost:8080//assets/"
    // },
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
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
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
    }
}

module.exports = baseWebpackConfig
