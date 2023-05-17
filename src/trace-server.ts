import { ChildProcess, spawn } from "child_process";
import { TspClient } from "tsp-typescript-client/lib/protocol/tsp-client";
import treeKill from "tree-kill";
import * as vscode from "vscode";

// Based on github.com/eclipse-cdt-cloud/vscode-trace-extension/blob/master/vscode-trace-extension/package.json
// -for naming consistency purposes across sibling extensions/settings:
const section = "trace-compass.traceserver";

const exit = "exit";
const millis = 10000;
const prefix = "Trace Server ";
const suffix = " failure or so.";

export class TraceServer {
  private server: ChildProcess | undefined;
  private client: TspClient | undefined;

  private start() {
    const from = vscode.workspace.getConfiguration(section);
    const server = spawn(this.getPath(from), this.getArgs(from));

    if (!server.pid) {
      console.error(prefix + "startup" + suffix);
      return;
    }
    this.server = server;
    const serverUrl = this.getUrl(from) + "/" + this.getApiPath(from);
    this.waitFor(serverUrl);
  }

  stop() {
    if (!this.server) {
      return;
    }
    if (this.server.pid) {
      let id: NodeJS.Timeout;
      this.server.once(exit, () => {
        clearTimeout(id);
      });
      const message = prefix + "stopping" + suffix;
      treeKill(this.server.pid, (error) => {
        if (error) {
          console.error(message);
        } else {
          id = setTimeout(() => console.error(message), millis);
        }
      });
    }
    this.server = undefined;
  }

  restart() {
    this.stop();
    this.start();
  }

  startIfStopped() {
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
  getPath_test = this.getPath;

  private getArgs(configuration: vscode.WorkspaceConfiguration): string[] {
    let args = configuration.get<string>("arguments");
    if (!args) {
      args = "";
    }
    return args.split(" ");
  }
  getArgs_test = this.getArgs;

  private getUrl(configuration: vscode.WorkspaceConfiguration): string {
    let url = configuration.get<string>("url");
    if (!url) {
      url = "http://localhost:8080";
    }
    return url;
  }
  getUrl_test = this.getUrl;

  private getApiPath(configuration: vscode.WorkspaceConfiguration): string {
    let apiPath = configuration.get<string>("apiPath");
    if (!apiPath) {
      apiPath = "tsp/api";
    }
    return apiPath;
  }
  getApiPath_test = this.getApiPath;

  private async waitFor(serverUrl: string) {
    this.client = new TspClient(serverUrl);
    let timeout = false;
    const timeoutId = setTimeout(() => (timeout = true), millis);

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const health = await this.client.checkHealth();
      const status = health.getModel()?.status;

      if (health.isOk() && status === "UP") {
        this.server?.once(exit, () => {
          this.stop();
        });
        clearTimeout(timeoutId);
        break;
      }
      if (timeout) {
        console.error(prefix + "startup timed-out after " + millis + "ms.");
        this.stop();
        break;
      }
    }
  }
}
