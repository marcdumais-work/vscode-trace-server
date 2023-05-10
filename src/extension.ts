import * as vscode from "vscode";
import { TraceServer } from "./trace-server";

const server = new TraceServer();
const start = "vscode-trace-server.start";
const stop = "vscode-trace-server.stop";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(start, () => {
      server.restart();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(stop, () => {
      server.stop();
    })
  );
}

export function deactivate() {
  vscode.commands.executeCommand(stop);
}
