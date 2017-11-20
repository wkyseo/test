var webpack = require('webpack');
var path = require('path');

/*
 * Default webpack configuration for development
 */
var config = {
  devtool: 'eval-source-map',
  entry: ['babel-polyfill', __dirname + '/router.js'],
  watch: false,
  resolve: {
    root: path.resolve('./'),
    extensions: ['', '.js']
  },
  output: {
    path: __dirname + '/../www',
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [{
      test: /\.js?$/,
      loader: 'eslint',
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-3', 'react']
      }
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
    }, {
      test: /\.css$/,
      loader: 'style!css!less'
    },
    {
      test: /\.(ttf|eot|svg|woff(2))(\?[a-z0-9]+)?$/,
      loader: 'file',
    },
    {
      include: path.resolve(__dirname, 'languages/neuron.json'),
      loader: 'null-loader',
    }]
  },
  postcss: [
    require('autoprefixer')({browsers: ['ios>=8']})
  ]
};

/*
 * If bundling for production, optimize output
 */
if (process.env.NODE_ENV === 'production') {
  config.devtool = false;
  config.plugins = (config.plugins || []).concat([
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false,
        drop_console: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]);
}

module.exports = config;