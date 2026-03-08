# VS Code Angular template generator

Forked from: https://github.com/mralexivy/vscode-angular2-files

Updated to match my personal preference for file structure and to keep it working into the future:

## Version 1.7 Fork!
* Formatting has been updated to match my personall preference
* Update all dependecies to 2026 standards

## Running Tests

The project uses `@vscode/test-electron` to launch the extension tests within a real
VS Code instance. Tests are written in TypeScript and compiled to the `out/` directory
alongside the extension code.

Simply execute:

```bash
npm test
```

This will build the extension and then spawn `vscode/test-electron` which in turn loads
`out/test/runTest.js`. The existing spec files under `test/` are run via Mocha inside
the extension host.
 