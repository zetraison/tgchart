const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

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
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/index.html', to: './' },
                { from: 'src/css', to: './css' },
                { from: 'src/data', to: './data' },
                { from: 'src/resources', to: './resources'}
            ]
        })
    ],

    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                terserOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true
                },
                sourceMap: false
            }),
        ]
    }
};