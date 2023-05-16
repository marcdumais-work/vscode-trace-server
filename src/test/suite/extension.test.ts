import * as assert from "assert";
import * as vscode from "vscode";
import * as extension from "../../extension";

// First generated from https://code.visualstudio.com/api/get-started/your-first-extension
suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start extension tests.");

  const start = "vscode-trace-server.start";
  const stop = "vscode-trace-server.stop";
  const startIfStopped = "vscode-trace-server.start-if-stopped";

  test("Extension should be able to register " + start, () => {
    let registered = false;
    extension.registerStart_test();

    vscode.commands.getCommands(true).then(function (commands) {
      for (const command in commands) {
        if (command === start) {
          registered = true;
        }
        if (registered) {
          break;
        }
      }
      assert.ok(registered);
    });
  });

  test("Extension should be able to register " + stop, () => {
    let registered = false;
    extension.registerStop_test();

    vscode.commands.getCommands(true).then(function (commands) {
      for (const command in commands) {
        if (command === stop) {
          registered = true;
        }
        if (registered) {
          break;
        }
      }
      assert.ok(registered);
    });
  });

  test("Extension should be able to register " + startIfStopped, () => {
    let registered = false;
    extension.registerStartIfStopped_test();

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
