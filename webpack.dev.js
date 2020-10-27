/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const webpackConfigCommon = require('./webpack.common');
const manifest = require('./dll/manifest.json');
const { devServerPort } = require('./app-config');

module.exports = merge(
  webpackConfigCommon,
  {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
      new webpack.DllReferencePlugin({
        context: path.resolve(__dirname, './dll'),
        manifest,
      }),
      new CopyPlugin([{
        from: path.resolve(__dirname, './dll'),
        to: path.resolve(__dirname, './dist'),
      }]),
    ],
    module: {
      rules: [
        {
          test: /.(js|jsx)$/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
              ],
              plugins: [
                '@babel/plugin-transform-modules-commonjs',
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-syntax-dynamic-import',
              ],
            },
          },
        },
        {
          test: /\.(sa|sc|le)ss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                import: false,
                modules: {
                  mode: 'local',
                  exportGlobals: true,
                  localIdentName: '[local]-[hash:base64:5]',
                  context: path.resolve(__dirname, 'src'),
                },
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(css)$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.(png|gif|svg|jpg)$/,
          use: [
            'url-loader',
          ],
        },
      ],
    },
    devServer: {
      // hot: true, // 子项目的热更新打开之后，页面既不会自动刷新，也不会自动刷新
      disableHostCheck: true,
      contentBase: './dist',
      port: devServerPort,
    },
  },
);
