#!/usr/bin/env node
// Helper script to run a single test by name/pattern
// Usage: node test-single.js "test name pattern"

const path = require('path');
const { spawn } = require('child_process');

const testPattern = process.argv.slice(2).join(' ');

WORK_DIR = __dirname.slice(0, -5)

if (!testPattern) {
    console.error('Usage: node test-single.js "test name pattern"');
    console.error('Example: node test-single.js "Should generate component with valid module declaration"');
    process.exit(1);
}

// First, compile the project
console.log('Building project...');

const buildProcess = spawn('npm', ['run', 'vscode:prepublish'], {
    cwd: WORK_DIR,
    stdio: 'inherit'
});

buildProcess.on('close', (code) => {
    if (code !== 0) {
        console.error('Build failed');
        process.exit(code);
    }

    // Run tests with grep pattern
    console.log(`\nRunning test matching: "${testPattern}"\n`);

    process.env.TEST_GREP = testPattern;

    const testProcess = spawn('node', ['./out/test/runTest.js'], {
        cwd: WORK_DIR,
        stdio: 'inherit',
        env: process.env
    });

    testProcess.on('close', (code) => {
        process.exit(code);
    });
});
