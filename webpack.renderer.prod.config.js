var webpack = require('webpack');
var path = require('path');

const {LicenseWebpackPlugin} = require('license-webpack-plugin');
const {CommonsChunkPlugin} = require('webpack').optimize;
const BabiliPlugin = require('babili-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src/renderer');

const nodeModules = path.join(process.cwd(), 'node_modules');

var config = {
    devtool: "source-map",
    target: "electron-renderer",
    entry: {
        "app": [APP_DIR + '/app.tsx', APP_DIR + '/app.html']
    },

    output: {
        path: BUILD_DIR,
        filename: '[name].prod.js'
    },

    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.styl']
    },

    module: {
        rules: [
            {
                test: /\.(eot|svg|ttf|woff|woff2|png)$/,
                loader: 'file-loader?name=public/asset/[name].[ext]'
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader',
                query: {
                    useBabel: true,
                    useCache: true,
                    babelOptions: {
                        presets: ["react-app"],
                        plugins: [["styled-components", {displayName: true}]]
                    },
                }

            }, {
                "test": /\.styl$/,
                "use": [
                    {
                        "loader": "style-loader"
                    },
                    {
                        "loader": "css-loader",
                        "options": {
                            "sourceMap": false,
                            "importLoaders": 1
                        }
                    },
                    {
                        "loader": "stylus-loader",
                        "options": {
                            "sourceMap": false,
                            "paths": []
                        }
                    }
                ]
            }, {
                "test": /\.css$/,
                "use": [
                    {
                        "loader": "style-loader"
                    },
                    {
                        "loader": "css-loader",
                        "options": {
                            "sourceMap": false,
                            "importLoaders": 1
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin({}),
        new CommonsChunkPlugin({
            "name": [
                "vendor"
            ],
            "minChunks": (module) => {
                return module.resource && module.resource.startsWith(nodeModules);
            },
            "chunks": [
                "app"
            ]
        }),
        new LicenseWebpackPlugin({
            "pattern": /^(MIT|ISC|BSD.*)$/
        }),
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': 'production'
        // }),
        // new BabiliPlugin(),


    ],

    node: {
        __dirname: false,
        __filename: false
    },


};

module.exports = config;
