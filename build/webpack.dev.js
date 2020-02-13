// 开发环境的配置文件
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');


const devConfig = {
    mode: "development", // 是否压缩,development代表不压缩
    devtool: "cheap-module-eval-source-map",    // source-map配置开发环境推荐使用的
    // devtool: "cheap-module-source-map",  // 线上环境推荐
    // 打包入口文件
    // webpack-dev-server官网配置：https://webpack.js.org/configuration/dev-server/
    devServer: {
        contentBase: './dist', // 监听的文件路径
        open: true,            // 自动打开浏览器
        port: 8080,
        hot: true,              // 热模块更新,不重新加载针对修改加载
        hotOnly: true
        // proxy:{
        //     '/api':'http://127.0.0.1'
        // }
    },
    plugins:[
        // 配置HMR 热模块更新
        new webpack.HotModuleReplacementPlugin()
    ],
    // 开发环境,确定每个模块下被使用的导出,而不是所有都导入。
    optimization: {
        usedExports: true
    }
};

module.exports = merge(commonConfig,devConfig);
