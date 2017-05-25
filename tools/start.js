// import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import Browsersync from 'browser-sync';
import run from './run';
import webpackConfig from './webpack.config';


function format(time) {
    return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

const ISRELEASED = process.argv.indexOf('--release');
const ISDEBUG = ISRELEASED === -1;

process.argv.push('--watch');

async function start() {
    console.log(`[${format(new Date())}] Project starting...`);
    await run(require('./clean').default); // eslint-disable-line global-require
    await new Promise((resolve) => {
        if (ISDEBUG) {
            // https://webpack.js.org/guides/hmr-react/
            webpackConfig.entry.app = [...new Set([
                'babel-polyfill',
                'react-hot-loader/patch',
                'webpack-hot-middleware/client',
            ].concat(webpackConfig.entry.app))];

            webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
            webpackConfig.plugins.push(new webpack.NamedModulesPlugin());
        }
        const compiler = webpack(webpackConfig);
        compiler.apply(new webpack.ProgressPlugin());

        // compiler.run((err, stats) => {
        //     if (err) {
        //         return reject(err);
        //     }
        //     console.info(stats.toString(webpackConfig[0]));
        //     return resolve();
        // });

        const wpMiddleware = webpackDevMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath,
            quiet: false,
            stats: {
                colors: true,
            },
        });

        const hotMiddleware = webpackHotMiddleware(compiler);

        const handleServerBundleComplete = () => {
            const browserSync = Browsersync.create();
            browserSync.init({
                ...(ISDEBUG ? {} : { notify: false, ui: false }),
                // 设定静态目录
                serveStatic: ['.', './dist'],
                open: false,
                proxy: {
                    target: 'http://localhost:8080',
                    middleware: [wpMiddleware, hotMiddleware],
                    proxyOptions: {
                        xfwd: true,
                    },
                },
            }, resolve);
        };
        compiler.plugin('done', stats => handleServerBundleComplete(stats));
    });
}

export default start;
