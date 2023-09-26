import HtmlWebpackPlugin = require('html-webpack-plugin');
import MiniCssExtractPlugin = require('mini-css-extract-plugin');
import path = require('path');
import autoprefixer = require('autoprefixer');
import { Configuration, EnvironmentPlugin } from 'webpack';
import 'webpack-dev-server';
import dotenv = require('dotenv');

const dotenvConfig = dotenv.config({
  path: path.join(__dirname, '.env.local'),
});

const srcPath = path.resolve(__dirname, './src');
const output = path.resolve(__dirname, './dist');

const entryPoint = {
  app: './index.tsx',
};

const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

const cssLoader =
  mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader;

console.log(`${mode} mode`);

const config: Configuration = {
  context: srcPath,
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: './[name].[contenthash].css',
      ignoreOrder: true,
    }),
    autoprefixer,
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html',
      chunks: ['app'],
      favicon: 'assets/favicons/favicon.ico',
    }),
    new EnvironmentPlugin({
      API_URL: dotenvConfig.parsed?.API_URL,
      API_ENTITY_ID: dotenvConfig.parsed?.API_ENTITY_ID,
    }),
  ],
  entry: entryPoint,
  output: {
    filename: './[name].[contenthash].js',
    assetModuleFilename: 'assets/[name][hash][ext][query]',
    path: output,
    clean: true,
  },
  devtool: mode === 'development' ? 'eval-source-map' : false,
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        exclude: /fonts|favicons/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][hash][ext][query]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        include: /fonts/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][hash][ext][query]',
        },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: 'current',
                  },
                },
              ],
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          cssLoader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer', 'postcss-preset-env'],
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    hot: true,
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
  },
};

export default config;
