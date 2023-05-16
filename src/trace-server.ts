import { ChildProcess, spawn } from "child_process";
import treeKill from "tree-kill";
import * as vscode from "vscode";

// Based on github.com/eclipse-cdt-cloud/vscode-trace-extension/blob/master/vscode-trace-extension/package.json
// -for naming consistency purposes across sibling extensions/settings:
const section = "trace-compass.traceserver";

export class TraceServer {
  private server: ChildProcess | undefined;

  private async start(): Promise<void> {
    const from = vscode.workspace.getConfiguration(section);
    this.server = spawn(this.getPath(from), this.getArgs(from));
  }

  async stop(): Promise<void> {
    await new Promise<void>(() => {
      if (this.server && this.server.pid) {
        treeKill(this.server.pid);
      }
    });
  }

  async restart(): Promise<void> {
    this.stop();
    this.start();
  }

  private getPath(configuration: vscode.WorkspaceConfiguration): string {
    let path = configuration.get<string>("path");
    if (!path) {
      // Based on this extension's package.json default, if unset here:
      path = "/usr/bin/tracecompass-server";
    }
    return path;
  }
  public getPath_test = this.getPath;

  private getArgs(configuration: vscode.WorkspaceConfiguration): string[] {
    let args = configuration.get<string>("arguments");
    if (!args) {
      args = "";
    }
    return args.split(" ");
  }
  public getArgs_test = this.getArgs;
}
