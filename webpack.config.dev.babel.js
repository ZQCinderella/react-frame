const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const appPath = path.resolve(__dirname, '');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const loadConfig = (options) => {

  // 定义根目录上下文，因为有的项目是用二级路径区分的
  const context = options.context;
  let entry = options.entry;
  delete entry.vendor;
  const html = options.html;
  const moduleName = options.moduleName;
  const htmlArr = html.map( ( item, i ) => {
    return new HtmlWebpackPlugin({
      filename: item.filename,
      template: item.template,
      chunks: item.chunks,
      isDev: true
    })
  } )
  const plugins = [
    new webpack.HotModuleReplacementPlugin(), // 热部署替换模块
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        // eslint 配置
        eslint: {
          emitError: true, // 验证失败，终止
          configFile: '.eslintrc.js'
        },
      }
    })
  ].concat( htmlArr )
  const webpackConfig = {
    devtool: 'eval-source-map', // 生成 source map文件
    target: 'web', // webpack 能够为多种环境构建编译, 默认是 'web'，可省略 https://doc.webpack-china.org/configuration/target/
    resolve: {
      //自动扩展文件后缀名
      extensions: ['.js', '.less', '.png', '.jpg', '.gif'],
      //模块别名定义，方便直接引用别名
      // alias: {
      //   'react-router-redux': path.resolve(nodeModules, 'react-router-redux-fixed/lib/index.js'),
      // },
      // 参与编译的文件
      modules: [
        'client',
        'node_modules',
      ],
    },

    // 入口文件 让webpack用哪个文件作为项目的入口
    entry,

    // 出口 让webpack把处理完成的文件放在哪里
    output: {
      // 编译输出目录, 不能省略
      path: path.resolve(appPath, 'public'), // 打包输出目录（必选项）
      filename: '[name].bundle.js', // 文件名称
      //资源上下文路径，可以设置为 cdn 路径，比如 publicPath: 'http://cdn.example.com/assets/[hash]/'
      publicPath: `${context}/`,
    },
    devServer: {
      inline: true,
      compress: true,
      contentBase: path.resolve(appPath, 'public'),
      hot: true,
      port: 9999,
      host: '10.56.13.126',
      publicPath: `${context}/`,
      disableHostCheck: true, // To Resolve the problem that: if changed the host config, visited page shows 'Invalid Host Header'
      historyApiFallback: {
        rewrites: [
          //多页面，则可以设置二级目录来区分
          { from: /^.*$/, to: `${context}/${moduleName}.html` }
        ]
      },
      proxy: {
          //这里是透传到node的端口
        '/query': {
          target: 'http://fet.bkjk-inc.com:8888',
          auth: false,
          changeOrigin: true
        },
        '/file': {
          target: 'http://fet.bkjk-inc.com:8888',
          auth: false,
          changeOrigin: true
        }
      }
    },
    module: {
      rules: [
        // https://github.com/MoOx/eslint-loader
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'eslint-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        // https://github.com/webpack/url-loader
        {
          test: /\.(png|jpg|gif)$/,
          use: {
            loader: 'url-loader',
            options: {
              name: '[hash].[ext]',
              limit: 100000, // 100kb
            }
          }
        },
        {
          test: /\.(mp4|ogg|eot|woff|ttf|svg)$/,
          use: 'file-loader',
        },
        {
          test: /\.css/,
          use: ['style-loader', {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: false,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          }, {
            loader: 'postcss-loader',
            options: {
              //pack: 'cleaner',
              sourceMap: true,
            }
          }],
        },
        {
          test: /\.less/,
          use: ['style-loader', {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: false,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          }, {
            loader: 'postcss-loader',
            options: {
              //pack: 'cleaner',
              sourceMap: true,
            }
          }, {
            loader: 'less-loader',
            options: {
              outputStyle: 'expanded',
            }
          }],
        }
      ]
    },
    plugins
  };

  //判断 dll 文件是否已生成
  //let dllExist = false;
  //try {
  //  fs.statSync(path.resolve(__dirname, 'public', 'dll', 'vendor.dll.js'));
  //  dllExist = true;
  //} catch (e) {
  //  dllExist = false;
  //}
  //
  //if (dllExist) {
  webpackConfig.plugins.push(
    new webpack.DllReferencePlugin({
      context: __dirname,
      /**
       * 在这里引入 manifest 文件
       */
      manifest: require('./public/cached/vendor-manifest.json')
    })
  );
  //}
  return webpackConfig;
}

module.exports = loadConfig;
