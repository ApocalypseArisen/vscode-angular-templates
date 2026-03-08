// Entry point used by the VS Code test host.  `@vscode/test-electron` will
// require this file and then call the exported `run` function.  In turn we
// create a Mocha instance, discover all compiled `.test.js` files and execute
// the suite.

import * as path from 'path';
import * as Mocha from 'mocha';
import * as glob from 'glob';

export function run(): Promise<void> {
    const mocha = new Mocha({ ui: 'bdd', color: true });
    const testsRoot = path.resolve(__dirname);

    // Support grep pattern for filtering tests
    const grepPattern = process.env.TEST_GREP;
    if (grepPattern) {
        mocha.grep(grepPattern);
    }

    return new Promise((resolve, reject) => {
        glob('**/*.test.js', { cwd: testsRoot }, (err, files) => {
            if (err) {
                return reject(err);
            }

            files.forEach(file => mocha.addFile(path.join(testsRoot, file)));

            try {
                mocha.run(failures => {
                    failures ? reject(new Error(`${failures} tests failed.`)) : resolve();
                });
            } catch (err) {
                reject(err);
            }
        });
    });
}
