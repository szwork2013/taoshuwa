var path = require('path');
var webpack = require('webpack');
// 编译后自动打开浏览器
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
// 产出html模板
var HtmlWebpackPlugin = require("html-webpack-plugin");
// 单独样式文件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var node_modules = path.resolve(__dirname, 'node_modules');
var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: false
});


module.exports = {
  entry: {
    index: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client?reload=true',
      'webpack-dev-server/client?http://localhost:8080',
      path.resolve(__dirname, 'src/index.js')
    ],
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "[name].js",
    publicPath: '/'
  },
  resolve: {
    extension: ['', '.jsx', '.js', '.json'],
    // 提高webpack搜索的速度
    alias: {}
  },
  'display-error-details': true,
  // 使用externals可以将react分离，然后用<script>单独将react引入
  externals: [],
  module: {
    // 使用module.noParse针对单独的react.min.js这类没有依赖的模块，速度会更快
    noParse: [
      path.resolve(node_modules, 'react/dist/react.min.js'),
      path.resolve(node_modules, 'react-dom/dist/react-dom.min.js')
    ],
    loaders: [{
      test: /\.js[x]?$/,
      loaders: ['react-hot', 'babel'],
      exclude: path.resolve(__dirname, 'node_modules')
    }, {
      test: /\.css/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    }, {
      test: /\.less/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url'
    }, {
      test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000"
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    //最终的html文件只引入两个js文件
    //自己编写的代码都放在app.js中，本地代码使用的是index.js,如果不设置默认是main.js
    //将第三方模块的代码统一打包进入vendorjs中
    new webpack.optimize.CommonsChunkPlugin('vendor','vendor.js'),
    new HtmlWebpackPlugin({
      title: 'your app title',
      template: './src/index.html',
      minify: { //压缩HTML文件
        removeComments: false, //移除HTML中的注释
        collapseWhitespace: true //删除空白符与换行符
      }
    }),
    new webpack.ProvidePlugin({
      "$": "jquery",
      "jQuery": "jquery",
      "window.jQuery": "jquery",
      "window.$": "jquery"
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    }),
    new ExtractTextPlugin("main.css", {
      allChunks: true,
      disable: false
    }),
    devFlagPlugin
  ]
};
