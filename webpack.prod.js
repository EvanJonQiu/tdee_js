const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(common, {
  optimization: {
    minimizer: [new UglifyJSPlugin()]
  },
  devtool: undefined,
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
      cache: true
    })
  ]
});
