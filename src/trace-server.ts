import { ChildProcess, spawn } from "child_process";
import { TspClient } from "tsp-typescript-client/lib/protocol/tsp-client";
import treeKill from "tree-kill";
import * as vscode from "vscode";

// Based on github.com/eclipse-cdt-cloud/vscode-trace-extension/blob/master/vscode-trace-extension/package.json
// -for naming consistency purposes across sibling extensions/settings:
const section = "trace-compass.traceserver";

const error = "error";
const prefix = "Trace Server ";

export class TraceServer {
  private server: ChildProcess | undefined;
  private client: TspClient | undefined;

  private async start(): Promise<void> {
    const from = vscode.workspace.getConfiguration(section);
    const server = spawn(this.getPath(from), this.getArgs(from));

    if (!server.pid) {
      console.error(prefix + "startup failure or so.");
      return new Promise<never>((_, reject) => server.once(error, reject));
    }
    this.server = server;
    const serverUrl = this.getUrl(from) + "/" + this.getApiPath(from);
    this.waitFor(serverUrl);
  }

  async stop(): Promise<void> {
    await new Promise<void>(() => {
      if (this.server && this.server.pid) {
        treeKill(this.server.pid);
        this.server = undefined;
      }
    });
  }

  async restart(): Promise<void> {
    this.stop();
    this.start();
  }

  async startIfStopped(): Promise<void> {
    if (!this.server) {
      this.start();
    }
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

  private getUrl(configuration: vscode.WorkspaceConfiguration): string {
    let url = configuration.get<string>("url");
    if (!url) {
      url = "http://localhost:8080";
    }
    return url;
  }
  public getUrl_test = this.getUrl;

  private getApiPath(configuration: vscode.WorkspaceConfiguration): string {
    let apiPath = configuration.get<string>("apiPath");
    if (!apiPath) {
      apiPath = "tsp/api";
    }
    return apiPath;
  }
  public getApiPath_test = this.getApiPath;

  private async waitFor(serverUrl: string): Promise<void> {
    this.client = new TspClient(serverUrl);
    let timeout = false;
    const millis = 10000;
    const timeoutId = setTimeout(() => (timeout = true), millis);

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const health = await this.client.checkHealth();
      const status = health.getModel()?.status;

      if (health.isOk() && status === "UP") {
        clearTimeout(timeoutId);
        break;
      }
      if (timeout) {
        console.error(prefix + "startup timed-out after " + millis + "ms.");
        return new Promise<never>((_, reject) =>
          this.server?.once(error, reject)
        );
      }
    }
  }
}
