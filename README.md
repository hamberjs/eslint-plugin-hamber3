# eslint-plugin-hamber3

An ESLint plugin for Hamber v3 components.

## Features

- Hamber compiler errors and warnings are exposed as ESLint errors and warnings
- Variables referred to in your template won't be marked as unused in your scripts
- References to store auto-subscriptions are considered references to the underlying variables
- Messages about self-assignments are suppressed, as this is an official pattern for manually triggering reactive updates
- Messages about unused labels called `$` are suppressed, as this is the syntax for reactive assignments

## Installation

`npm install eslint-plugin-hamber3`

The code on `master` may depend on unreleased Hamber 3 features. Tagged releases should always work with the specified Hamber version. The latest tagged version requires at least Hamber `3.0.0-beta.21`.

## Usage

Just add `hamber3` to the array of plugins in your `.eslintrc.*`.

This plugin needs to be able to `require('hamber/compiler')`. If ESLint, this plugin, and Hamber are all installed locally in your project, this should not be a problem.

**Important!** Make sure you do not have `eslint-plugin-html` enabled on the files you want linted as Hamber components, as the two plugins won't get along.

## Configuration

Some settings work best with a function as their value, which is only possible using a CommonJS-formatted `.eslintrc.js` file, and not a JSON- or YAML-formatted configuration file. Using `overrides` in the configuration file for specific globs will also give you more control over the configuration.

### `hamber3/enabled`

This can be `true` or `false` or a function that accepts a file path and returns whether this plugin should process it.

The default is to lint all files that end in `.hamber`. This can be changed by passing a new function, or by using ESLint `overrides` for this setting for specific globs.

### `hamber3/ignore-warnings`

This can be `true` or `false` or an array of Hamber compiler warning codes or a function that accepts a warning code and returns whether to ignore it in the linting.

The default is to not ignore any warnings.

### `hamber3/ignore-styles`

If you're using some sort of preprocessor on the component styles, then it's likely that when this plugin calls the Hamber compiler on your component, it will throw an exception. In a perfect world, this plugin would be able to apply the preprocessor to the component and then use source maps to translate any warnings back to the original source. In the current reality, however, you can instead simply disregard styles written in anything other than standard CSS. You won't get warnings about the styles from the linter, but your application will still use them (of course) and compiler warnings will still appear in your build logs.

This can be `true` or `false` or a function that accepts an object of attributes on a `<style>` tag (like that passed to a Hamber preprocessor) and returns whether to ignore the style block for the purposes of linting.

The default is to not ignore any styles.

## Integration

It's probably a good idea to make sure you can lint from the command line before proceeding with configuring your editor.

### CLI

Using this with the command line `eslint` tool shouldn't require any special actions. Just remember that if you are running `eslint` on a directory, you need to pass it the `--ext` flag to tell it which nonstandard file extensions you want to lint.

### Visual Studio Code

You'll need the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension installed.

Unless you're using `.html` for your Hamber components, you'll need to configure `files.associations` to associate the appropriate file extension with the `html` language. For example, to associate `.hamber`, put this in your `settings.json`:

```json
{
  "files.associations": {
    "*.hamber": "html"
  }
}
```

Then, you'll need to tell the ESLint extension to also lint files with language `html` and to enable autofixing problems. If you haven't adjusted the `eslint.validate` setting, it defaults to `[ "javascript", "javascriptreact" ]`, so put this in your `settings.json`:

```json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "html",
      "autoFix": true
    }
  ]
}
```

Reload VS Code and give it a go!

### Atom

You'll need the [linter](https://atom.io/packages/linter) and [linter-eslint](https://atom.io/packages/linter-eslint) packages installed.

Unless you're using `.html` for your Hamber components, you'll need to configure `*`.`core`.`customFileTypes` to associate the appropriate file extension with the `test.html.basic` language. For example, to associate `.hamber`, put this in your `config.cson`:

```cson
"*":
  core:
    customFileTypes:
      "text.html.basic": [
        "hamber"
      ]
```

Then, you'll need to tell linter-eslint to also lint HTML files: add `source.html` to the list of scopes to run ESLint on in the linter-eslint settings.

Reload Atom and give it a go!

### Sublime Text

You'll need the [SublimeLinter](https://github.com/SublimeLinter/SublimeLinter) and [SublimeLinter-eslint](https://github.com/SublimeLinter/SublimeLinter-eslint) packages installed.

Unless you're using `.html` for your Hamber components, you'll need to configure Sublime to associate the appropriate file extension with the `text.html` syntax. Open any Hamber component, and go to **View > Syntax > Open all with current extension as... > HTML**.

Then, you'll need to tell SublimeLinter-eslint to lint entire files with the `text.html` syntax, and not just the contents of their `<script>` tags (which is the default). In your SublimeLinter configuration, you'll need to add `text.html` to `linters`.`eslint`.`selector`. If you're starting with the default values, this would mean:

```json
{
  "linters": {
    "eslint": {
      "selector": "source.js - meta.attribute-with-value, text.html"
    }
  }
}
```

Reload Sublime and give it a go!

### Other integrations

If you've gotten this plugin to work with other editors, please let us know!

## License

[MIT](LICENSE)
