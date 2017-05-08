/* tslint:disable:no-var-requires object-literal-sort-keys */
import * as autoprefixer from 'autoprefixer';
import * as promise from 'es6-promise';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const configuration: webpack.Configuration = {
  devtool: 'hidden-source-map',
  entry: [
    './src/index.tsx',
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.min.js',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new ExtractTextPlugin({
      filename: '/bundle.min.css',
      allChunks: true,
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
      },
    }),
    new webpack.LoaderOptionsPlugin({ options: { postcss: [ autoprefixer ] } }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new BundleAnalyzerPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
          publicPath: '/dist',
        }),
        include: path.join(__dirname, '../src/sass'),
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        use: 'file-loader?name=/img/[name].[ext]',
      },
      {
        test: /\.ts$|\.tsx$/,
        use: ['awesome-typescript-loader'],
        include: path.join(__dirname, '../src'),
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js', '.ts', '.tsx', '.json'],
  },
};

export default configuration;
