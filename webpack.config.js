const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components)/,
      loader: "babel-loader",
      options: {
        presets: ["@babel/env"]
      }
    }, {
      test: /\.(scss)$/,
      use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'postcss-loader', options: {plugins: function() {return [require('autoprefixer')];}}}, {loader: 'sass-loader'}]
    }]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  }
};