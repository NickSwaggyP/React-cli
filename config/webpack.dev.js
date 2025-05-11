const EslintWebpackPlugin =require('eslint-webpack-plugin')
const HtmlWebpackPlugin =require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require("path")


// 返回处理样式loader函数
const getStyleLoaders=(pre)=>{
    return [
        "style-loader",
        "css-loader",
        {
            // 处理css兼容性问题
            // 配合package.json中browserslist来指定兼容性
            loader:"postcss-loader",
            options:{
                postcssOptions:{
                    plugins: ["postcss-preset-env"]
                }
            }
        },
        pre
    ].filter(Boolean)
}


module.exports={
    entry:"./src/main.js",
    output:{
        path: undefined,
        filename: "static/js/[name].js",
        chunkFilename: "static/js/[name].chunk.js",
        assetModuleFilename: "static/media/[hash:10][ext][query]",
    },
    module:{
        rules:[
            //处理css
            {
                test: /\.css$/,
                use: getStyleLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                use:getStyleLoaders("sass-loader")
            },
            {
                test: /\.less$/,
                use:getStyleLoaders("less-loader")
            },
            {
                test: /\.styl$/,
                use:getStyleLoaders("stylus-loader")
            },
            //处理图片
            {
                test: /\.(jpe?g|png|webp|svg)/,
                type: "asset",
                parser:{
                    dataUrlCondition:{
                        maxSize: 10*1024
                    }
                }
            },
            //处理其他资源
            {
                test: /\.(woff2?|ttf)/,
                type: "asset/resource"
            },
            //处理js
            {
                test: /\.[jt]sx?$/,
                include: path.resolve(__dirname,'../src'),
                loader:'babel-loader',
                options:{
                    cacheDirectory: true,
                    cacheCompression: false,
                    plugins: [
                        'react-refresh/babel' //激活js的HMR
                    ]
                }
            },
        ]
    },
    //处理html
    plugins:[
        new EslintWebpackPlugin({
           context: path.resolve(__dirname,'../src'),
           exclude: "node_modules",
           cache: true,
           cacheLocation: path.resolve(__dirname,'../node_modules/.cache/.eslintcache')
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'../public/index.html')
        }),
        new ReactRefreshWebpackPlugin(), //激活js的HMR
    ],
    mode: "development",
    devtool: "cheap-module-source-map",
    optimization: {
        splitChunks:{
            chunks: "all"
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}.js`
        }
    },
    // webpack解析模块加载选项
    resolve:{
        extensions: [".tsx",".ts",".jsx",".js",".json"]
    },
    devServer: {
        host: "localhost",
        port:3000,
        open: true,
        hot: true,//开启 HMR
        historyApiFallback: true, //解决前端路由刷新404问题
    }
}