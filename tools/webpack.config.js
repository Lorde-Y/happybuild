import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const ISRELEASED = process.argv.indexOf('--release');
const DEBUG = ISRELEASED === -1;

const srcPath = path.resolve(__dirname, '../src');

const isMin = DEBUG ? '' : '.min';

let dllConfig = null;
let dllConfigUrl = DEBUG ? '../dist/vender/dll-config.json' : '../dist/vender/dll-config.min.json';
dllConfig = require(path.resolve(__dirname, dllConfigUrl));

// http://caniuse.com/  可以查询在中国使用的浏览器类型及版本
const BROWSER_AUTOPREFIXER = [
    'Android >= 4',
    'and_chr >= 51',
    'Chrome >= 20',
    'bb >= 8',
    'Opera >= 20',
    'Edge >= 6',
    'firefox >= 20',
    'Explorer >= 9',
    'ie_mob >= 10',
    'ios_saf > 8',
    'safari >= 6',
    'and_uc >= 5',
    'Samsung >= 4',
];

module.exports = {
    // devtool: 'cheap-source-map',
    devtool: DEBUG ? 'cheap-module-source-map' : false,
    context: path.resolve(__dirname, '../'),
    entry: {
        app: [
            './src/app',
        ],
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: DEBUG ? '[name].js?_=[hash]' : 'js/[name].[hash].js',
        chunkFilename: '[name].js?[hash]-[chunkhash]',
        publicPath: DEBUG ? '' : '/',
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                use: [
                    { loader: 'babel-loader' },
                ],
                exclude: [
                    path.resolve(__dirname, '../node_modules'),
                ],
                include: [
                    srcPath,
                ],
            },
            // https://webpack.js.org/guides/migrating/ #Chaining loaders & https://github.com/postcss/postcss-loader
            {
                test: /\.less$/,
                // DEBUG
                use: DEBUG ? [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ] : ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'less-loader'],
                }),
                // Production
                // use: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: ['css-loader', 'postcss-loader', 'less-loader']
                // }),
                exclude: [
                    path.resolve(__dirname, '../node_modules'),
                ],
                include: [
                    srcPath,
                ],
            },
            // {
            //     test: /\.svg$/,
            //     loader: 'svg-inline-loader?classPrefix'
            // },
            {
                test: /\.(png|jpg|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'images/[hash:8].[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(eot|ttf|woff|svg|wav|mp3)$/,
                use: "file-loader?name=[name].[ext]",
            },
        ],
    },
    // https://github.com/webpack/webpack/issues/3486
    performance: {
        hints: DEBUG ? false : 'warning',
    },
    resolve: {
        modules: [srcPath, 'node_modules'],
        extensions: ['.js', '.jsx'],
        alias: {
            action: path.resolve(srcPath, './action'),
            component: path.resolve(srcPath, './component'),
            container: path.resolve(srcPath, './container'),
            config: path.resolve(srcPath, './config'),
            utils: path.resolve(srcPath, './utils'),
        },
    },
    cache: !DEBUG,
    stats: {
        cached: !DEBUG,
        errors: DEBUG,
    },
    plugins: [
        // https://github.com/cssmagic/blog/issues/58 Loader options & minimize
        new webpack.LoaderOptionsPlugin({
            minimize: !DEBUG,
            debug: DEBUG,
            options: {
                // https://github.com/postcss/postcss-loader/issues/128
                postcss: [
                    // these options will send to postcss-loader
                    require('autoprefixer')({   // eslint-disable-line global-require
                        browsers: BROWSER_AUTOPREFIXER,
                    }),
                ],
            },
        }),
        
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: DEBUG ? JSON.stringify('development') : JSON.stringify('production'),
            }
        }),

        new HtmlWebpackPlugin({
            title: 'My App',
            filename: 'index.html',
            template: 'src/content/index.html',
            minify: DEBUG ? false : {
                removeComments: true,
                collapseWhitespace: true,
            },
            dllName: 'vender/' + dllConfig.library.js,
            chunks: ['app'],
            cache: DEBUG,
            hash: DEBUG,
        }),
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require('../dist/vender/library-mainfest'+isMin+'.json'), // eslint-disable-line global-require
        }),
        // only when production
        ...(DEBUG ? [] : [
            new ExtractTextPlugin({
                filename: 'css/[name].[contenthash].css',
                disable: false,
                allChunks: true,
            }),

            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                },
                beautify: false,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true,
                },
                compress: {
                    screw_ie8: true,
                },
                comments: false,
            }),
        ]),
    ],
    // devServer: {
    //     port: 7000,
    //     contentBase: '../build', // 定义静态服务器的基路径
    //     hot: true,
    //     // inline: true,
    //     historyApiFallback: true,
    //     // publicPath is same with output.publicPath, or HMR doesn't work
    //     publicPath: DEBUG ? 'http://localhost:7000/' : 'http://cdn.com',
    //     stats: { colors: true },
    // },
};