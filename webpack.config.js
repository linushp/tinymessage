const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function isProduction() {
  return process.env.NODE_ENV === 'production';
}


let buildObj = {
  devtool: isProduction() ? '' : 'source-map',
  mode: isProduction() ? 'production' : 'development',
  entry: {
    'tinymessage': path.join(__dirname, "./src/tinymessage.js"),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: `[name].js`,
    library: 'TinyMessage',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-class-properties',
              'babel-plugin-transform-async-to-promises'
            ],
            presets: [
              ['@babel/preset-env', {targets: {browsers: ['last 3 versions', 'Safari >= 8', 'iOS >= 8']}}],
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}]
      },
      {
        test: /\.less$/,
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {
          loader: 'less-loader',
          options: {javascriptEnabled: true}
        }]
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
    })
  ],
  devServer: {
    contentBase: './',
    open: false,
    host: '127.0.0.1',
    port: 80,
    https: false,
    hotOnly: false,
    disableHostCheck: true,
    proxy: {},
    historyApiFallback: {
      index: '/index.html',
    },
    before: function () {

    }
  }
};


function addHtmlWebpackPlugin(buildObj) {
  let plugins = buildObj.plugins || [];
  let entry = buildObj.entry || {};
  for (let name in entry) {
    if (entry.hasOwnProperty(name)) {
      let htmlPlugin = new HtmlWebpackPlugin({
        chunks: [name],
        template: path.join(__dirname, `./templates/${name}.html`),
        filename: `${name}.html`
      });
      plugins.push(htmlPlugin);
    }
  }
  buildObj.plugins = plugins;
  return buildObj;
}


buildObj = addHtmlWebpackPlugin(buildObj);
module.exports = [buildObj];
