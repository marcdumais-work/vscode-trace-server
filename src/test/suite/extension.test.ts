import * as assert from 'assert';
import * as vscode from 'vscode';
import * as extension from '../../extension';

// First generated from https://code.visualstudio.com/api/get-started/your-first-extension
suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start extension tests.');

    const extensionId = 'vscode-trace-server';
    const stopOrReset = extensionId + '.stop-or-reset';
    const startIfStopped = extensionId + '.start-if-stopped';

    const prefix = 'Extension should be able to register ';

    test(prefix + stopOrReset, () => {
        let registered = false;
        extension.registerStopOrReset_test(undefined);

        vscode.commands.getCommands(true).then(function (commands) {
            for (const command in commands) {
                if (command === stopOrReset) {
                    registered = true;
                }
                if (registered) {
                    break;
                }
            }
            assert.ok(registered);
        });
    });

    test(prefix + startIfStopped, () => {
        let registered = false;
        extension.registerStartIfStopped_test(undefined);

        vscode.commands.getCommands(true).then(function (commands) {
            for (const command in commands) {
                if (command === startIfStopped) {
                    registered = true;
                }
                if (registered) {
                    break;
                }
            }
            assert.ok(registered);
        });
    });
});
