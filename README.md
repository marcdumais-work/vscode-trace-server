# VSCode Trace Server extension

* This is a TypeScript extension, officially named `vscode-trace-server`.
* It is meant as companion to the [vscode-trace-extension][vscode-trace-extension].

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

## Development

The usual [Prettier][prettier] and [ESLint][eslint] combo in VS Code or Codium OSS is used.

* [This matcher][matcher] is also used, since the originally generated extension per [guide].
* Markdown gets linted with the (usual) [vscode-markdownlint][markdownlint] extension.
* [SonarLint][sonarlint] is also assumed while further developing this extension.

These are actual [recommended extensions herein](.vscode/extensions.json).

## Status

This extension is currently under [initial development][backlog].

[backlog]: https://github.com/eclipse-cdt-cloud/vscode-trace-extension/issues/15
[eslint]: https://open-vsx.org/extension/dbaeumer/vscode-eslint
[guide]: https://code.visualstudio.com/api/get-started/your-first-extension
[install]: https://code.visualstudio.com/docs/editor/extension-marketplace#_install-from-a-vsix
[markdownlint]: https://open-vsx.org/extension/DavidAnson/vscode-markdownlint
[matcher]: https://open-vsx.org/extension/amodio/tsl-problem-matcher
[prettier]: https://open-vsx.org/extension/esbenp/prettier-vscode
[sample]: https://github.com/microsoft/vscode-extension-samples/blob/main/helloworld-sample
[sonarlint]: https://open-vsx.org/extension/SonarSource/sonarlint-vscode
[vsce]: https://code.visualstudio.com/api/working-with-extensions/publishing-extension#vsce
[vscode-trace-extension]: https://github.com/eclipse-cdt-cloud/vscode-trace-extension
