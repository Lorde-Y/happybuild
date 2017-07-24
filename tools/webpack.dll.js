import webpack from 'webpack';
import path from 'path';
import AssetsWebpackPlugin from 'assets-webpack-plugin';

const library = [
    'react',
    'react-dom',
];

// 设置 生产环境主要是 解决 控制台报 React的错误提示
const ISRELEASED = process.argv.indexOf('--release');
const DEBUG = ISRELEASED === -1;

const isMin = DEBUG ? '' : '.min';


module.exports = {
    entry: {
        library,
    },
    output: {
        path: path.resolve(__dirname, '../dist/vender'),
        filename: DEBUG ? '[name].[hash].js' : '[name].[hash].min.js',
        chunkFilename: '[name].[chunkhash].js',
        library: '[name]_[hash]',
    },
    plugins: [
        // https://github.com/cssmagic/blog/issues/58 Loader options & minimize
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: DEBUG ? JSON.stringify('development') : JSON.stringify('production'),
            },
        }),

        new webpack.DllPlugin({
            path: path.resolve(__dirname, '../dist/vender/[name]-mainfest'+isMin+'.json'),
            name: '[name]_[hash]',
            context: '.',
        }),

        ...(DEBUG ? [] : [
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
        
        new AssetsWebpackPlugin({
            filename: DEBUG ? 'dll-config.json' : 'dll-config.min.json',
            path: path.join(__dirname, '../dist/vender'),
        }),
    ],
};
