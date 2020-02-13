// 公共配置的common配置文件
// 引入node的模块path
const path = require('path');
// 引入HtmlWebpackPlugin：打包结束自动生成html,并且把bundle.js引入到这个html里
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入CleanWebpackPlugin:每次打包的时候清除掉上次生成的打包文件dist
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

// commonJS语法导出,webpack能识别
module.exports = {
    // 打包入口文件
    entry: {
        main: './src/index.js'
    },
    module: {
        rules: [
            // 使用babel-loader处理es6语法 https://babeljs.io/setup#installation
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                // options可以配置一个单独的.babelrc文件里,
                // useBuiltIns只根据目前的代码转换ES5代码,体积减小，并且不需要再index.js里引入@babel/polyfill
                options: {
                    presets: [["@babel/preset-env", {
                        targets: {
                            chrome: "67",
                        },
                        useBuiltIns: 'usage'
                    }]]
                }
            },
            {
                // 处理文件静态资源的loader:https://webpack.js.org/loaders/file-loader/
                // 我们选择使用url-loader替代file-loader https://webpack.js.org/loaders/url-loader/
                // url-loader它除了可以处理图片，还可以根据图片大小进行处理是否生成base64的js,下面的例子如果图片小于8kb的话使用该loader处理
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // Placeholders占位符:文件名称输出的文件夹
                            name: '[name]_[hash].[ext]',
                            outputPath: 'images/',
                            limit: 8192
                        }
                    },
                ],
            },
            {
                // 使用file-loader处理字体图标
                test: /\.(eot|ttf|svg|woff)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name]-[hash:5].min.[ext]",
                        limit: 5000, // size <= 3000B, 改成5000B试试?
                        publicPath: "fonts/",
                        outputPath: "fonts/"
                    }
                }
            },
            // 处理css
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: [require("autoprefixer")]
                        }
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                // loader的执行顺序是从下往上,从右往左。先处理sass转成css再由style挂载
                use: [
                    'style-loader',
                    // importLoaders的作用是如果我们在其他的sass文件里再@import引入其他的sass文件的使用
                    // 如果不添加该参数,它不会走下面的2个loader
                    // 举例：index.js引入index.scss,index.scss再@import其他的acss的时候这个配置就派上用场了
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                            // 模块化使用css,哪里用到这个css文件,在哪里import它,然后引入名.属性的方式使用。
                            modules: true
                        }
                    },
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            // 处理less
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "postcss-loader", "less-loader"]
            }
        ]
    },
    // 使用HtmlWebpackPlugin
    plugins: [
        new HtmlWebpackPlugin({
            // 引用src下的模板
            template: 'src/index.html'
            // 使用CleanWebpackPlugin 每次清楚dist目录
        }), new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['dist']
        }, {
            // 用来配合CleanWebpackPlugin 清除的目录，因为现在的目录在bulid里
            root: path.resolve(__dirname, '../')
        })
    ],
    //下面配置webpack 4.x 自动帮我们做代码分割  # Code Splitting
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    // 打包出口文件
    output: {
        // 出口文件的路径 __dirname就是当前配置文件所在的路径后面拼接dist文件夹
        path: path.resolve(__dirname, '../dist'),
        filename: "[name].js"       // 配置输出的文件名
    }
};
