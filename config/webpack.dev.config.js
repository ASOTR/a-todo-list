const path = require('path');
const baseWebpackConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test:/\.css$/,
        use:[
          'style-loader',
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            }
          },
          'postcss-loader'
        ]
      },
      {
        test:/\.less/,
        use:[
          'style-loader',
          {
            loader: "css-loader",
            /*options: {//CSS Modules
              sourceMap: true,
              modules: {
                mode:'local',
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
            }*/
            options: {
              sourceMap: true,
            }
          },
          'postcss-loader',
          'less-loader',
        ]
      },
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
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    //new CleanWebpackPlugin()
    new VueLoaderPlugin()
  ]
});

module.exports = devWebpackConfig;
