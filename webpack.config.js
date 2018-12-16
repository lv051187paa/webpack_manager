const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const devMode = process.env.NODE_ENV !== "production";
console.log(process.env.NODE_ENV);

let config = devMode => ({
  entry: {
    main: "./src/js/main.js",
    scripts: "./src/js/scripts.js"
  },
  devServer: {
    contentBase: "./src",
    hot: true
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: ["html-loader"],
            options: {
              minimize: !devMode
            }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }]
      },
      canPrint: true
    }),
  ]
});

module.exports = (env, argv) => {
  console.log(argv.modeDevelopment);

  return config(argv.modeDevelopment);
};
