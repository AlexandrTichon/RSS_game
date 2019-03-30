const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'sourse-map',
  entry: ['./src/app.js', './src/screens/home/home.sass', './src/components/login/login.sass',
    './src/screens/login/loginParam.sass', './src/screens/battle/battle.sass', './src/components/healthBar/heathBar.sass',
    './src/screens/task/taskParam.sass', './src/screens/gameEnd/gameEnd.sass', './src/components/navBar/navBar.sass'],
  module: {
    rules: [
      {
        test: /\.(m?js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react'],
          },
        },
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader'],
          },
        ),
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [

    new ExtractTextPlugin({
      filename: 'home.css',
    }),
  ],
  devServer: {
    overlay: true,
  },
};
