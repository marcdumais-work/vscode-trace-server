import * as vscode from "vscode";
import { TraceServer } from "./trace-server";

const server = new TraceServer();
const start = "vscode-trace-server.start";
const stop = "vscode-trace-server.stop";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(registerStart());
  context.subscriptions.push(registerStop());
}

export function deactivate() {
  vscode.commands.executeCommand(stop);
}

function registerStart(): vscode.Disposable {
  return vscode.commands.registerCommand(start, () => {
    server.restart();
  });
}
export const registerStart_test = registerStart;

function registerStop(): vscode.Disposable {
  return vscode.commands.registerCommand(stop, () => {
    return server.stop();
  });
}
export const registerStop_test = registerStop;
