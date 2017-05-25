import path from 'path';
// import fetch from 'node-fetch';
import { spawn } from './lib/childprocess';
import { makeDir } from './lib/fs';
import run from './run';

// const remote = {
//     name: 'github',
//     url: 'git@github.com:Lorde-Y/happybuild.git',
//     branch: 'master',
//     static: true,
// };

const options = {
    cwd: path.resolve(__dirname, '../'),
    env: process.env,
};


async function deploy() {
    await makeDir('build');
    await spawn('git', ['init'], options);

    // Build the project in RELEASE mode
    // generates optimized and minimized bundles
    const processArr = process.argv;
    const length = process.argv.length - 1;
    process.argv.splice(length, 0, '--release');
    const commitMsg = processArr[length + 1];

    await run(require('./clean').default); // eslint-disable-line global-require
    await run(require('./bundle').default); // eslint-disable-line global-require
    await spawn('git', ['add', '.'], options);
    await spawn('git', ['commit', '-m', `${commitMsg}`], options);
    await spawn('git', ['push', 'origin', 'master']);
}

export default deploy;
