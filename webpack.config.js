// const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

let cssFileName = 'assets/styles/[name].css';
let mode = 'development';
let devtool = 'source-map';

if (process.env.NODE_ENV === 'production') {
  cssFileName = 'assets/styles/[name].[contenthash].min.css';
  mode = 'production';
  devtool = false;
}

module.exports = {
  mode,
  devtool,
  entry: {
    main: path.resolve(__dirname, 'src/assets/styles/main.css'),
    fonts: path.resolve(__dirname, 'src/assets/styles/fonts.js'),
  },
  output: {
    path: path.resolve(__dirname, '_site/'),
    publicPath: '/',
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, 'public'), to: path.resolve(__dirname, '_site') }],
    }),
    new webpack.HashedModuleIdsPlugin(),
    new FixStyleOnlyEntriesPlugin({
      extensions: ['less', 'scss', 'css', 'styl', 'sass', 'png', 'gif', 'jpg', 'jpeg', 'js'], // Empty js should also not be generated with image
    }),
    new MiniCssExtractPlugin({
      filename: cssFileName,
    }),
    new WebpackManifestPlugin({
      filter: (fileDesc) => fileDesc.isChunk,
      useEntryKeys: true,
      fileName: path.resolve(__dirname, 'src/_data/assets.json'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          'postcss-loader',
        ],
      },
      // {
      //   test: /\.(gif|png|jpg|jpeg)$/i,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: 'images/posts/[name].[ext]',
      //       },
      //     },
      //     {
      //       loader: 'image-webpack-loader',
      //       options: {
      //         mozjpeg: {
      //           progressive: true,
      //           quality: 65,
      //         },
      //         // optipng.enabled: false will disable optipng
      //         optipng: {
      //           enabled: false,
      //         },
      //         pngquant: {
      //           quality: [0.65, 0.9],
      //           speed: 4,
      //         },
      //         gifsicle: {
      //           interlaced: true,
      //         },
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(eot|ttf|woff|woff2|svg|jpg|png)$/i,
        loader: 'url-loader',
      },
    ],
  },
};
