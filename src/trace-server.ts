import { ChildProcess, spawn } from "child_process";
import treeKill from "tree-kill";
import * as vscode from "vscode";

export class TraceServer {
  private server: ChildProcess | undefined;

  private async start(): Promise<void> {
    this.server = spawn(this.getPath());
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

  private getPath(): string {
    // Based on github.com/eclipse-cdt-cloud/vscode-trace-extension/blob/master/vscode-trace-extension/package.json
    // -for naming consistency purposes across sibling extensions/settings:
    const configuration = vscode.workspace.getConfiguration(
      "trace-compass.traceserver"
    );

    let path = configuration.get<string>("path");
    if (!path) {
      // Based on this extension's package.json default, if unset here:
      path = "/usr/bin/tracecompass-server";
    }
    return path;
  }
}
