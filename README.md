# VSCode Trace Server extension

This is a companion extension to the Trace Viewer for VSCode. It makes it easier to control a default local TSP ([Trace Server Protocol][tsp]) enabled trace server, by providing `Trace Server:` start/stop commands.

For development information, please see the developers [README][dev-readme]


## Configuration

The following preference settings can be used, under `Trace Server`.

* trace server `path` : enter the absolute path and filename of your trace server
  * default value: `/usr/bin/tracecompass-server`
* Command-line `arguments`: Enter any CLI arguments you want passed to your trace server. See [here][server] for valid options for the incubator version of the Trace Compass server
  * Multiple arguments have to be separated by a space character

## Usage

### Starting the Trace Server

Use the `Trace Server: start (if stopped)` command to launch the trace server instance. The latter should be made of two related processes; `grep` for `tracecompass` or the like.

### Stopping the Trace Server

Use the `Trace Server: stop or reset` command to kill both processes, stopping the server. If the server was stopped outside the application (e.g. killed), using this command will reset the known `pid` and allow to start it again.

Note that exiting the application should automatically stop the started server if started through it. 

## Acknowledgments

This extension was started from VSCode's [guide](https://code.visualstudio.com/api/get-started/your-first-extension) and related [samples](https://github.com/microsoft/vscode-extension-samples/tree/main/helloworld-sample)

[dev-readme]: https://github.com/eclipse-cdt-cloud/vscode-trace-server/blob/main/README-dev.md
[server]: https://git.eclipse.org/r/plugins/gitiles/tracecompass.incubator/org.eclipse.tracecompass.incubator/+/refs/heads/master/trace-server/#running-the-server

[tsp]: https://github.com/eclipse-cdt-cloud/trace-server-protocol