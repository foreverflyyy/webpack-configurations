const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[fullhash].bundle.js',
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.md'],
        alias: {
            '@': path.resolve(__dirname, '../src/client'),
            '@resources': path.resolve(__dirname, '../src/resources'),
            stream: 'stream-browserify',
            path: 'path-browserify',
        },
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/,
                type: 'asset/inline',
            },
            {
                test: /\.md$/,
                type: 'asset/source',
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, '../public'),
                globOptions: {
                    ignore: [
                        '**/template.html',
                        '**/favicon.ico'
                    ]
                }
            }]
        }),
    ],
};