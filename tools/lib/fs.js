/**
 * https://github.com/substack/node-mkdirp
 */
// import fs from 'fs';
// import path from 'path';
import mkdirp from 'mkdirp';

export const makeDir = name =>
    new Promise((resolve, reject) => {
        mkdirp(name, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });

export default {
    makeDir,
};