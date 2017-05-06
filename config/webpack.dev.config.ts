/* tslint:disable:no-var-requires object-literal-sort-keys */
import * as autoprefixer from 'autoprefixer';
import * as path from 'path';
import * as webpack from 'webpack';

const configuration: webpack.Configuration = {
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index.tsx',
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/static/',
  },
  devServer: {
    // All options here: https://webpack.js.org/configuration/dev-server/

    // enable HMR on the server
    hot: true,
    // match the output path
    contentBase: path.join(__dirname, '../dist'),
    // match the output `publicPath`
    publicPath: '/static/',

    // Enable to integrate with Docker
    // host:"0.0.0.0",

    port: 3000,
    historyApiFallback: true,
    // All the stats options here: https://webpack.js.org/configuration/stats/
    stats: {
      "colors": true, // color is life
      "chunks": false, // this reduces the amount of stuff I see in my terminal; configure to your needs
      'errors-only': false
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
      },
    }),
    new webpack.LoaderOptionsPlugin({ options: { postcss: [ autoprefixer ] } }),
  ],
  module: {
    rules: [
      {
          enforce: 'pre',
          test: /\.ts(x?)$/,
          use: 'source-map-loader',
          exclude: '/node_modules/'
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.ts(x?)$/,
        include: path.join(__dirname, '../src'),
        use: [
            { loader: 'react-hot-loader/webpack' },
            { loader: 'awesome-typescript-loader' }
        ],
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.json', '.', '.js', '.jsx'],  // the js extensions are necessary for webpack
  },
};

export default configuration;
