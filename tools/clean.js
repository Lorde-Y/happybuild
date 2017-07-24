/**
 * https://github.com/sindresorhus/del
 */
import del from 'del';

// Cleans up the output (dist) directory.
async function cleanDir() {
    await del.sync(['dist/*', '!dist/vender']);
}

export default cleanDir;