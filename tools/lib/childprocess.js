/**
 * http://nodejs.cn/api/child_process.html
 * use childprocess to excute order
 */

import childProcess from 'child_process';

export const spawn = (command, args, options) =>
    new Promise((resolve, reject) => {
        childProcess.spawn(command, args, options).on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`${command} ${args.join(' ')} excuted error!!!`));
            }
        });
    });

export const exec = (command, options) =>
    new Promise((resolve, reject) => {
        childProcess.exec(command, options, (err, stdout, stderr) => {
            if (err) {
                reject(err);
                return;
            }
            resolve({ stdout, stderr });
        });
    });

export default { spawn, exec };