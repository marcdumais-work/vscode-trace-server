# VSCode Trace Server extension

* This is a TypeScript extension, officially named `vscode-trace-server`.
* It is meant as companion to the [vscode-trace-extension][vscode-trace-extension].
* It registers `Trace Server:` start/stop commands, for a default instance locally.

This extension was started from Code's [guide][guide] and related [sample][sample].

## Documentation

This README is the usual entry point for documenting this extension.

* One may refer to the [contribution guide](CONTRIBUTING.md) for how to contribute.
* Please also refer to the [security policy](SECURITY.md) on a need basis.
* The usual [license description](LICENSE.md) file accompanies these too.

## Build

Run `yarn`, which should automatically include `yarn install`.

* This extension is bundled using `webpack`, originally based on [the guide][guide].
* There is no support yet for any automated CI on GitHub; planned for though.

## Test

Run `yarn test` on a need basis.

Alternatively, launch `Extension Tests` under `Run and Debug`.

## Installation

1. Follow [these instructions][vsce] once to run `vsce package` at will.
1. [Install][install] the hereby generated `vscode-trace-server-*.vsix` file.
1. Alternatively, simply launch the packaged extension using `Run Extension`.
1. Through `Command Palette`, the `Trace Server:` start/stop commands should be available.

This extension can be installed in either one (or many) of:

* [VS Code][code] or [Codium][codium], or
* a [Theia][theia] application or [Blueprint][blueprint].

A nearby [companion extension][vscode-trace-extension] installation renders a `Trace Server`
[status bar item][item].

## Configuration

* Under the usual `Trace Compass` preference settings, the trace server `path` can be entered.
* Otherwise, the default `/usr/bin/tracecompass-server` is assumed locally.

## Usage

1. Use the `Trace Server: (re)start` command to launch that Trace Compass server instance.
1. The latter should be made of two related processes; `grep` for `tracecompass` or the like.
1. Use the `Trace Server: stop` command once ready to kill both processes, stopping the server.
1. Alternatively, exiting the application should automatically stop the started server if any.

The above runs the trace server using defaults based on [Incubator's][server] (README).

* `Trace Server: (re)start` can also be used if willing to stop then (re)start the server.
* `Trace Server: (re)start` stops the previously started server if any; to use with care.
* `Trace Server: stop` used upon no previously started server does nothing.

Currently, there is no check if the start/stop commands were successful; `ps` can be used.

## Development

The usual [Prettier][prettier] and [ESLint][eslint] combo in VS Code or Codium OSS is used.

* [This matcher][matcher] is also used, since the originally generated extension per [guide].
* Markdown gets linted with the (usual) [vscode-markdownlint][markdownlint] extension.
* [SonarLint][sonarlint] is also assumed while further developing this extension.

These are actual [recommended extensions herein](.vscode/extensions.json).

## Status

This extension is currently under [initial development][backlog].

[backlog]: https://github.com/eclipse-cdt-cloud/vscode-trace-extension/issues/15
[blueprint]: https://theia-ide.org/docs/blueprint_download
[code]: https://code.visualstudio.com
[codium]: https://vscodium.com
[eslint]: https://open-vsx.org/extension/dbaeumer/vscode-eslint
[guide]: https://code.visualstudio.com/api/get-started/your-first-extension
[install]: https://code.visualstudio.com/docs/editor/extension-marketplace#_install-from-a-vsix
[item]: https://github.com/eclipse-cdt-cloud/vscode-trace-extension/pull/120
[markdownlint]: https://open-vsx.org/extension/DavidAnson/vscode-markdownlint
[matcher]: https://open-vsx.org/extension/amodio/tsl-problem-matcher
[prettier]: https://open-vsx.org/extension/esbenp/prettier-vscode
[sample]: https://github.com/microsoft/vscode-extension-samples/blob/main/helloworld-sample
[server]: https://git.eclipse.org/r/plugins/gitiles/tracecompass.incubator/org.eclipse.tracecompass.incubator/+/refs/heads/master/trace-server/#running-the-server
[sonarlint]: https://open-vsx.org/extension/SonarSource/sonarlint-vscode
[theia]: https://theia-ide.org
[vsce]: https://code.visualstudio.com/api/working-with-extensions/publishing-extension#vsce
[vscode-trace-extension]: https://github.com/eclipse-cdt-cloud/vscode-trace-extension
