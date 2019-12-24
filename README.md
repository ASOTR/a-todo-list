#### 一个todo应用以了解熟悉vue，webpack4.X相关配置和部分踩坑
##### 一：[webpack](https://webpack.js.org/guides/)配置注意事项
- [mode](https://webpack.js.org/configuration/mode/)的设置  
webpack mode参数配置process.env.NODE_ENVvue生产/开发环境检测
webpack3-需要配置 new webpack.DefinePlugin({'process.env.NODE_ENV':  '"development"'})  
而webpack4+ 只需要配置 mode: 'development'
- 配置vue  
`npm i -D vue-loader vue-template-compiler`  
现在需要配置`VueLoaderPlugin`插件
```
const VueLoaderPlugin = require('vue-loader/lib/plugin')
plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
]
```
具体参考[vue-loader](https://vue-loader.vuejs.org/zh/guide/)文档  
配置了vue-loader之后.vue文件中<template>使用图片时src自动import或require，参考vue-loader 的 transformAssetUrls配置  

- babel的配置  
添加`.babelrc`,babel7+配置新增`@babel`的前缀
```
{
  "presets": [
    ["@babel/preset-env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }]
  ],
  "plugins": ["@babel/plugin-transform-runtime"]
}
```
并在package.json添加[`browserslist`](https://github.com/browserslist/browserslist#browserslist-)配置,这个browserslist配置会对babel/posscss/eslint...等通用,stage0的配置已弃用
``` 
"browserslist": [
  "> 1%",
  "last 2 versions",
  "not ie <= 8"
]
```
>注意事项：  
 1：babel-loader is slow:
   babel编译很慢，尽量编译少量的js，需要减少不必要的编译模块`exclude: /node_modules/`  
 2：babel代码注入问题:babel只能直接转换es6语法糖为es5代码，而没有编译成新api的功能如Promise，generator等。  
 `Babel is injecting helpers into each file and bloating my code：plugin-transform-runtime、transform-runtime、babel-polyfill`  
 babel-polyfill提供完整的es6语法支持，但会造成全局变量污染。开发使用babel-plugin-transform-runtime，生产环境使用babel-runtime  
 ``` 
 npm install --save-dev @babel/plugin-transform-runtime
 npm install --save @babel/runtime
 ```
 `@babel/runtime as a production dependency (since it's for the "runtime").`


- production环境分离CSS/js  
css分离:ExtractTextPlugin插件换成MiniCssExtractPlugin  
``` 
new MiniCssExtractPlugin({
  // Options similar to the same options in webpackOptions.output
  // both options are optional
  // 使用contenthash缓存css文件
  filename: 'css/[name]--[contenthash].css',
  chunkFilename: 'css/[id]--[contenthash].css',
}),
```
js分离：`webpack.optimize.CommonsChunkPlugin`改成`optimization`配置
``` 
// 公共模块依赖独立打包：例如vue.js不会经常变更
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
```
- 使用`autoprefix`给css自动添加前缀进行浏览器兼容



##### 二：遇到的一些问题
- 在vue的`<template>`引用图片资源显示为[object]：file-loader版本问题，需要添加`esModule:false`配置
``` 
{
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
        limit: 100,
        name: '[name].[ext]',
        esModule:false,
        outputPath: 'images/',
    }
}
```
- computed计算属性与filter属性区别
filter更适用于处理日期等问题通过管道`|`方式格式化，但是测试到data属性的任意一个值发生改变都会调用一次filter方法而computed具有缓存效果。
- 列表for循环，key值的设置  
不设置key值，会出现列表更新时vue不更新视图样式，只更新了数据的问题。  
列表过度动画，添加过度transition-group name="list" tag="ul"，transition-group里边的每个项都要有key，否则报错
