import webpack from 'webpack';
import path from 'path';
import AssetsWebpackPlugin from 'assets-webpack-plugin';

const library = [
    'react',
    'react-dom',
];

module.exports = {
    entry: {
        library,
    },
    output: {
        path: path.resolve(__dirname, '../dist/vender'),
        filename: '[name].min.js',
        chunkFilename: '[name].[chunkhash].js',
        library: '[name]_[hash]',
    },
    plugins: [
        // https://github.com/cssmagic/blog/issues/58 Loader options & minimize
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
        new webpack.DllPlugin({
            path: path.resolve(__dirname, '../dist/vender/[name]-mainfest.json'),
            name: '[name]_[hash]',
            context: '.',
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
        new AssetsWebpackPlugin({
            filename: 'assets.json',
            path: path.join(__dirname, '../dist'),
        }),
    ],
};
