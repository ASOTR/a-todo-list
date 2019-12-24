const baseWebpackConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const WebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "js/bundle-[chunkhash].js",
    chunkFilename: 'js/[id].[chunkhash].js',
    // 影响打包后的页面引用bundle.js带有前缀或公共路径
    publicPath: "/",
    //publicPath: "localhost:8080//assets/"
  },
  module: {
    rules: [
       {
				test: /\.css$/,
				use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
				]
			}
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // copy custom static assets
    /*new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: "static",
        ignore: ['.*']
      }
    ]),*/

    // new ExtractTextPlugin({
    //   filename: "./css/[name]--[md5:contenthash].css",
    //   allChunks: true,
    // }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name]--[contenthash].css',
      chunkFilename: 'css/[id]--[contenthash].css',
    }),
    new OptimizeCSSPlugin(),
    new UglifyJsPlugin(),
   /* new CompressionWebpackPlugin({ //js、css压缩
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js(\?.*)?$/i,
      threshold: 10240,
      minRatio: 0.8
    }),*/
    new VueLoaderPlugin(),
  ],
  // 公共模块依赖独立打包：例如vue.js
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
});

module.exports = WebpackConfig;
