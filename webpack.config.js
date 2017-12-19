var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var extractTextPugin = require('extract-text-webpack-plugin');

//if the css is in dev or in production
var isProd = process.env.NODE_ENV === 'production'; //boolean
var cssDev = ['style-loader','css-loader' ];
var cssProd = extractTextPugin.extract({
    fallback:'style-loader',
    use: 'css-loader',
    publicPath: '/dist'
})
var cssConfig = isProd ? cssProd : cssDev;


module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.app.js'
    },

    module: {
        rules: [
            {test: /\.css$/, 
            use: cssConfig
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },

    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        hot: true,
        port: 8000
    },

    plugins: [
    new htmlWebpackPlugin({
        title: 'react APP',
        minify: {
            collapseWhitespace: true
        },
       // filename: '../index.html',
        template: './src/index.html'
    }),
    new extractTextPugin({
        filename: 'bundle.app.css',
        disable: !isProd,
        allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globoly

    new webpack.NamedModulesPlugin(),
    // prints more readable module name in the browser console on HMR update

]

}