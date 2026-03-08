import * as path from 'path';
import { runTests } from '@vscode/test-electron';

async function main() {
    try {
        const extensionDevelopmentPath = path.resolve(__dirname, '../');
        const extensionTestsPath = path.resolve(__dirname, './index');

        // Extract --grep pattern from command line arguments
        const grepIndex = process.argv.indexOf('--grep');
        const grepPattern = grepIndex !== -1 && grepIndex + 1 < process.argv.length
            ? process.argv.slice(grepIndex + 1).join(' ')
            : undefined;

        if (grepPattern) {
            process.env.TEST_GREP = grepPattern;
        }

        // run the integration tests using the VS Code Test Electron runner
        await runTests({
            extensionDevelopmentPath,
            extensionTestsPath,
            launchArgs: ['--disable-extensions']
        });
    } catch (err) {
        console.error('Failed to run extension tests', err);
        process.exit(1);
    }
}

main();
