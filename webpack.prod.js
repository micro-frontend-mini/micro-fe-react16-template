/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackConfigCommon = require('./webpack.common');
const manifest = require('./dll/manifest.json');

module.exports = merge(
  webpackConfigCommon,
  {
    mode: 'production',
    devtool: 'none',
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest,
      }),
      // copy plugin 用最新 6.x 版本本地打包正常，测试环境发布一直报错，😔
      // 看 changelog 6.x 要求 node 的版本 10.13+，估计是服务器 node 版本过低导致的问题
      new CopyPlugin([{
        from: path.resolve(__dirname, './dll'),
        to: path.resolve(__dirname, './dist'),
      }]),
    ],
    module: {
      rules: [
        // {
        //   test: /.(js|jsx|css)$/, // css 解决IE8下CSS的相关loader报错问题
        //   enforce: 'post', // post-loader处理
        //   use: [
        //     'es3ify-loader',
        //   ],
        // },
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
            // {
            //   loader: MiniCssExtractPlugin.loader,
            // },
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
    optimization: {
      minimize: false,
      removeAvailableModules: false, // 官方建议，提升构建性能，v4 默认打开，v5 默认禁用，所以这里改为禁用
      splitChunks: {
        /**
         * 这里只能用 async，而不能用 all，否则会导致主项目报错，目测原因是对所有文件分包会导致入口文件不完整
         * 然后主项目中会无法正确拿到入口对象
         */
        // chunks: 'all',
        chunks: 'async',
      },
    },
    devServer: {
      // host: '172.16.58.54',
    },
  },
);
