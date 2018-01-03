var webpack = require('webpack');
var path = require('path');

const {LicenseWebpackPlugin} = require('license-webpack-plugin');
const {CommonsChunkPlugin} = require('webpack').optimize;
const { spawn } = require('child_process');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src/renderer');

const nodeModules = path.join(process.cwd(), 'node_modules');

const port = process.env.PORT || 4567;
const publicPath = `http://localhost:${port}/dist`;

var config = {
    devtool: "source-map",
    target: "electron-renderer",
    entry: {
        "app": [APP_DIR + '/app.tsx', APP_DIR + '/app.html']
    },

    output: {
        path: BUILD_DIR,
        filename: '[name].dev.js'
    },

    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.styl']
    },

    module: {
        rules: [
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg)$/,
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
    ],

    node: {
        __dirname: false,
        __filename: false
    },

    devServer: {
        port,
        publicPath,
        compress: true,
        noInfo: true,
        stats: 'errors-only',
        inline: true,
        lazy: false,
        hot: true,
        headers: {'Access-Control-Allow-Origin': '*'},
        contentBase: path.join(__dirname, 'dist'),
        watchOptions: {
            aggregateTimeout: 300,
            ignored: /node_modules/,
            poll: 100
        },
        historyApiFallback: {
            verbose: true,
            disableDotRule: false,
        },
        before() {

            console.log('Staring Main Process...');
            spawn(
                'npm',
                ['run', 'start-main-dev'],
                {shell: true, env: process.env, stdio: 'inherit'}
            )
            .on('close', code => process.exit(code))
            .on('error', spawnError => console.error(spawnError));

        }
    },
};

module.exports = config;
