/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const { appName } = require('./app-config');

const { NODE_ENV, BUILD_ENV } = process.env;

module.exports = {
  entry: path.resolve(__dirname, './src/App'),
  output: {
    filename: `${appName}.js`,
    chunkFilename: '[id].[name].bundle.[chunkhash:8].js',
    // publicPath: '/', // publicPath 会在项目中动态生成，此处无需设置
    path: path.resolve(__dirname, 'dist'),
    library: appName,
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  target: 'web',
  externals: {
    react: 'ReactV16',
    'react-dom': 'ReactDOMV16',
    antd: 'antdV4',
    classnames: 'classNames',
    'prop-types': 'PropTypes',
    // 'react-router-dom': 'ReactRouterDOM',
    'js-cookie': 'Cookies',
    moment: 'moment',
    lodash: '_',
    axios: 'axios',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      'process.env.BUILD_ENV': JSON.stringify(BUILD_ENV),
    }),
  ],
  optimization: {
    removeAvailableModules: false, // 官方建议，提升构建性能，v4 默认打开，v5 默认禁用，所以这里改为禁用
  },
  devServer: {
    // hot: true, // 子项目的热更新打开之后，页面既不会自动刷新，也不会自动刷新
    disableHostCheck: true,
    contentBase: './dist',
  },
};
