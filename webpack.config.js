const webpack = require('webpack')
const path = require('path')




/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks�
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');//ѹ��js�ļ�
const HtmlWebpackPlugin = require('html-webpack-plugin');//���� html �ļ�
const WebpackDevServer = require('webpack-dev-server');//ʵʱˢ��ҳ��



module.exports = {
  module: {
    rules: [{
      include: [path.resolve(__dirname, 'src')],
      loader: 'babel-loader',

      options: {
        plugins: ['syntax-dynamic-import'],

        presets: [['env', {
          'modules': false
        }]]
      },

      test: /\.js$/
    }, {
      test: /\.css$/,

      use: [{
        loader: 'style-loader',

        options: {
          sourceMap: true
        }
      }, {
        loader: 'css-loader'
      }]
    }]
  },
	plugins: [
    new HtmlWebpackPlugin({
		  title: 'webpack-cli'
		})
  ],
	devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080
  },
	
  entry: {
    index: ['./src/index.js','./src/index2.js']
  },

  output: {
    filename: '[name].[hash].js',		//�����������������ļ��е�chunkhash �滻Ϊhash
		// filename: '[name].[chunkhash].js',		//�����������������Ҫʹ�ò��� --hot
    path: path.resolve(__dirname, 'dist')
  },

  mode: 'development',

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  }
}