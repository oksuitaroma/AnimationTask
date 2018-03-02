const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const extractPlugin = new ExtractTextPlugin({filename: './assets/css/app.css'});

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: ['./app.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, '../src')],
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader?cacheDirectory=true',
          options: {
            presets: ['env']
          }
        }
      }, {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      }, {
        test: /\.scss$/,
        include: [path.resolve(__dirname, 'src')],
        use: extractPlugin.extract({
          use: [
            'css-loader', 'sass-loader'
          ],
          fallback: 'style-loader'
        })
      }, {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './assets/media/'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader:'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './assets/fonts/',
              //publicPath: './assets/fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: 'index.html'}),
    extractPlugin,
    new CleanWebpackPlugin(['dist']),

      new CopyWebpackPlugin([
        //{ from: '**/*', to: 'relative/path/to/dest/' }
        { from: 'media', to: './' }
      ])
    
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./dist/assets/media"),
    compress: true,
    port: 8080,
    stats: 'errors-only',
    open: true
  }
}

module.exports = config