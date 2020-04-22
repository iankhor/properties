require('dotenv').config({ path: __dirname + '/.env' });

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const src = path.resolve(__dirname, 'src');

const serverConfig = {
  target: 'node',
  entry: path.resolve(__dirname, 'src', 'backend', 'server.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
  },
};

const appConfig = {
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: 'awesome-typescript-loader',
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          { loader: 'css-modules-typescript-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 9000,
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css', '.ts', '.tsx'],
    alias: {
      components: `${src}/frontend/components`,
      hooks: `${src}/frontend/hooks`,
      styles: `${src}/frontend/styles`,
      lib: `${src}/frontend/lib`,
      testlib: `${src}/testlib`,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html', //source html
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.REACT_APP_PROPERTIES_ENDPOINT': JSON.stringify(process.env.REACT_APP_PROPERTIES_ENDPOINT),
    }),
  ],
};

module.exports = [appConfig, serverConfig];
