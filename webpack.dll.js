/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const { appName } = require('./app-config');

const { NODE_ENV } = process.env;
const library = '[name]_lib';

module.exports = {
  mode: NODE_ENV,
  entry: {
    vendor: [
      'react-router-dom',
      'redux',
      'react-redux',
      'redux-spring',
    ],
  },
  output: {
    path: path.join(__dirname, './dll'),
    filename: `${appName}-dll.[name].js`,
    library,
  },
  plugins: [
    new webpack.DllPlugin({
      name: library,
      path: path.join(__dirname, './dll/manifest.json'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  target: 'web',
  externals: {
    react: 'ReactV16',
    'react-dom': 'ReactDOMV16',
    antd: 'antdV4',
    classnames: 'classNames',
    'prop-types': 'PropTypes',
    'react-router-dom': 'ReactRouterDOM',
    'js-cookie': 'Cookies',
    lodash: '_',
    moment: 'moment',
    axios: 'axios',
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        enforce: 'post', // post-loader处理
        use: [
          'es3ify-loader',
        ],
      },
      {
        test: /.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env']],
            plugins: [
              ['@babel/plugin-transform-modules-commonjs'],
              ['@babel/plugin-transform-object-assign'],
            ],
          },
        },
      },
    ],
  },
  optimization: {
    removeAvailableModules: false, // 官方建议，提升构建性能，v4 默认打开，v5 默认禁用，所以这里改为禁用
  },
};
