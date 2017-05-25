/**
 * https://webpack.js.org/concepts/plugins/#node-api
 * http://webpack.github.io/docs/node.js-api.html
 * webpack work with Nodejs
 * Bundle third library to one js file
 */
import webpack from 'webpack';
import webpackConfig from './webpack.dll';

function bundleDll() {
    const compiler = webpack(webpackConfig);
    compiler.apply(new webpack.ProgressPlugin());

    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) {
                return reject(err);
            }
            console.info(stats.toString(webpackConfig[0]));
            return resolve();
        });
    });
}

export default bundleDll;