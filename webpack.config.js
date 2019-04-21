const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

    entry: {
        "bundle": "./src/app.js",
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].js',
    },

    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/index.html', to: './' },
            { from: 'src/css', to: './css' },
            { from: 'src/data', to: './data' },
            { from: 'src/resources', to: './resources'}
        ])
    ],

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true
                },
                sourceMap: false
            })
        ]
    }
};