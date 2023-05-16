import * as assert from "assert";
import * as vscode from "vscode";
import { TraceServer } from "../../trace-server";

suite("TraceServer Test Suite", () => {
  vscode.window.showInformationMessage("Start trace-server tests.");

  const from = vscode.workspace.getConfiguration("trace-compass.traceserver");
  const server = new TraceServer();

  test("TraceServer should be able to get default path", () => {
    const path = server.getPath_test(from);
    assert.strictEqual(path, "/usr/bin/tracecompass-server");
  });

  test("TraceServer should be able to get default arguments", () => {
    const args = server.getArgs_test(from);
    assert.deepEqual(args, [""]);
  });
});
