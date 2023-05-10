import { ChildProcess, spawn } from "child_process";
import treeKill from "tree-kill";

export class TraceServer {
  private server: ChildProcess | undefined;

  private async start(): Promise<void> {
    this.server = spawn("/usr/bin/tracecompass-server");
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
}
