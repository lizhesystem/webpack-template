// 生成环境的配置环境
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
// 开发模式的配置
const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map'
};

// 合并配置
module.exports = merge(commonConfig, prodConfig);
