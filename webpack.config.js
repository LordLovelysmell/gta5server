const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const hq = require('alias-hq')


module.exports = {
  entry: {
    'packages/RP': './app/server/index.ts',
    'client_packages': './app/client',
  },
  resolve: {
    extensions: ['.js', '.ts',],
    alias: hq.get('webpack')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    path: path.resolve(__dirname),
    filename: '[name]/index.js'
  },
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'app/client/Browsers/Web/gta5-vue/dist', to: 'client_packages/RP/Browsers' }
      ]
    })
  ]
};
