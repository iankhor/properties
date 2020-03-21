require('dotenv').config({ path: __dirname + '/.env' });

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const src = path.resolve(__dirname, 'src');

module.exports = {
  entry: path.resolve(__dirname, 'src/index'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 9000
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css'],
    alias: {
      components: `${src}/components`,
      hooks: `${src}/hooks`,
      lib: `${src}/lib`,
      testlib: `${src}/testlib`,
      styles: `${src}/styles`
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html' //source html
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.REACT_APP_PROPERTIES_ENDPOINT': JSON.stringify(process.env.REACT_APP_PROPERTIES_ENDPOINT)
    })
  ]
};
