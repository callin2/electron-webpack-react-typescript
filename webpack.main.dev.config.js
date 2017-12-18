var path = require('path');
var webpack = require('webpack');
var {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

var config = {
    devtool: 'source-map',
    target: 'electron-main',
    entry: [
        './src/main/main.js',
        './src/main/package.json'
    ],

    output: {
        path: __dirname,
        filename: './dist/main_.js'
    },

    resolve: {
        extensions: ['.js', '.json'],
        modules: [
            path.join(__dirname, 'src/main'),
            'node_modules',
        ],
    },

    module: {
        rules: [
            {
                test: /\.(json)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[name].[ext]",
                            outputPath: "./dist/"
                        }
                    }
                ]
            },
            {
                test: /\.(js)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[name].[ext]",
                            outputPath: "./dist/"
                        }
                    }
                ]
            },
            // {
            //     test: /\.jsx?$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             cacheDirectory: true
            //         }
            //     }
            // }
        ]
    },

    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: process.env.OPEN_ANALYZER == 'true' ? 'server' : 'disabled',
            openAnalyzer: process.env.OPEN_ANALYZER == 'true'
        }),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
            'process.env.DEBUG_PROD': JSON.stringify(process.env.DEBUG_PROD || 'false')
        })
    ],

    node: {
        __dirname: false,
        __filename: false
    },
}

module.exports = config;
