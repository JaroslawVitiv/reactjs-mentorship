const { merge } = require('webpack-merge');
const common = require('./webpack.common.cjs');

module.exports = merge(common, {
  mode: 'development',

  devtool: 'inline-source-map',

  devServer: {
    static: './dist',
    historyApiFallback: true, // SPA routing
    port: 3000,
    open: true,
    hot: true,
  },
});
