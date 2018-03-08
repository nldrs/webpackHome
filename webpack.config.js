const path = require('path');
const textWp = require('extract-text-webpack-plugin');
const cssN = require('postcss-cssnext');
const webpack = require('webpack');
const PurCss = require('purifycss-webpack');
const glob = require('glob-all');
const htmlPlugin = require('html-webpack-plugin');
const postSprite = require('postcss-sprites');
const inlineChunk = require('html-webpack-inline-chunks-plugin');
const cleanPlugin = require('clean-webpack-plugin');
const server = require('webpack-dev-server');
const config = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'js/[name].bundle-[hash:5].js',
        chunkFilename: '[name].bundle.js'
    },
    devtool: "cheap-module-source-map",
    devServer: {
        compress: true,
        port: 7000,
        overlay:true,
        historyApiFallback: true,
        hot: true,
        // hotOnly:true,
       /* proxy: {
            '/': {
                target: 'https://jsonplaceholder.typicode.com',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: {
                    '^/1': '/posts/1'
                }
            }
        }*/
    },
    resolve: {
        alias: {
            jquery$: path.resolve(__dirname, 'src/libs/jquery.min.js')
        }
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use:textWp.extract({
                fallback: {
                    loader: 'style-loader',
                    options: {
                        insertInto: '#app',
                        // singleton:true,
                        sourceMap: true,
                        transform: './css.transform.js'
                    }
                },
            use: [
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                    //minimize:true,
                    //modules:true,
                    //localIdentName:'[path][name]__[local]--[hash:base64:5]'
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    sourceMap: true,
                    plugins: [
                        //require('autoprefixer')(),
                        postSprite({
                            spritePath: '/assets/imgs/'
                        }),
                        cssN()
                    ]
                }
            },
            {
                loader: 'less-loader',
                options: {
                    sourceMap: true
                }
            }
                ]
            })},

            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env'],
                            plugins: ['lodash']
                        }
                    }
                    /*,
                    {
                        loader:'eslint-loader',
                        options:{
                            formatter:require("eslint-friendly-formatter")
                        }
                    }*/
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 50,
                            outputPath: 'assets/imgs/',
                            name: '[name]-[hash:5].[ext]',
                            // useRelativePath:true,
                            // publicPath:'assets/imgs/'
                        }
                    },
                    {
                        loader: 'img-loader',
                    }
                ]
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader'
                    }
                ]
            },
            {
                test: path.resolve(__dirname, 'src/app.js'),
                use: [
                    {
                        loader: 'imports-loader',
                        options: {
                            $: 'jquery'
                        }
                    }
                ]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':src', ':data-src']
                    }
                }
            }
        ]
    },
    plugins: [
        new htmlPlugin({
            template: './index.html',
            //chunks:['app'],
            minify: {
                //collapseWhitespace:true
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new inlineChunk({
            inlineChunks: ['manifest']
        }),
        new textWp({
            filename: '[name].min-[hash:5].css',
            allChunks: false
        }),
        /*new PurCss({
            paths:glob.sync([
                path.resolve(__dirname,'./!*.html'),
                path.join(__dirname,'./src/!*.js')
            ])
        }),*/
        // new webpack.optimize.UglifyJsPlugin(),
        /*new webpack.ProvidePlugin({
            $:'jquery'
        })*/
        new cleanPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
};
module.exports = config;