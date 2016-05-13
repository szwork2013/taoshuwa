var path = require('path');
var webpack = require('webpack');
// 产出html模板
var HtmlWebpackPlugin = require("html-webpack-plugin");
// 单独样式文件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var node_modules = path.resolve(__dirname, 'node_modules');
var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: true
});


module.exports = {
  entry: {
    index: [ path.resolve(__dirname, 'src/index.js') ],
    vendor: ['react', 'react-dom']
  },
  output: {
    //path: path.resolve( __dirname, 'build'),
    path:'/Users/pengjian/desktop/taoshuwa-api/build',
    filename: "[name].[hash:8].js",
    publicPath: '/'
  },
  resolve: {
    extension: ['', '.jsx', '.js', '.json'],
    // 提高webpack搜索的速度
    alias: {}
  },
  // 使用externals可以将react分离，然后用<script>单独将react引入
  externals: [],
  module: {
    // 使用module.noParse针对单独的react.min.js这类没有依赖的模块，速度会更快
    noParse: [
      path.resolve(node_modules, 'react/dist/react.min.js'),
      path.resolve(node_modules, 'react-dom/dist/react-dom.min.js')
    ],
    loaders: [
      {
        test: /\.js[x]?$/,
        loaders: ['react-hot', 'babel'],
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.less/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=8192'
      },
      {
        test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000"
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[hash:8].js'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
         warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      title: 'your app title',
      template: './src/index.html',
    }),
    // new webpack.ProvidePlugin({
    //   "$": "jquery",
    //   "jQuery": "jquery",
    //   "window.jQuery": "jquery",
    //   "window.$": "jquery"
    // }),
    new ExtractTextPlugin("main.[hash:8].css", {
      allChunks: true,
      disable: false
    }),
    devFlagPlugin
  ]
};
