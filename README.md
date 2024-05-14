# codemod

Simple set of codemod transformations

## Usage

```sh
npx @jowapp/codemod <transform> <path> [...options]
```

- `transform` - name of transform, see available transforms below.
- `path` - files or directory to transform (use quotes otherwise the path(s) will be expanded by your shell, [which may not support globstar](https://medium.com/@jakubsynowiec/you-should-always-quote-your-globs-in-npm-scripts-621887a2a784))
- use the `--dry` option for a dry-run and use `--print` to print the output for comparison

This will start an interactive wizard, and then run the specified transform.

All jscodeshift's options are supported, and defaults are the same than the one of jscodeshift's CLI.

> [!NOTE]
> jscodeshift's option defaults apply only to its CLI, its API has none, except the parser which defaults to `@babel/parser` (see `babel5Compat.js`)

> All options are also passed to the transformer, which means you can supply custom options that are not listed here.

### Recast Options

Options to [recast](https://github.com/benjamn/recast)'s printer can also be provided through jscodeshift's `printOptions` command line argument, as `react-codemod` does it:

```sh
npx react-codemod <transform> <path> --jscodeshift="--printOptions='{\"tabWidth\":2}'"
```

> [!NOTE]
> Regarding `printOptions`, please check [here](https://github.com/jowapp/codemod/pull/3#issuecomment-2108375648) and [here](https://github.com/jowapp/codemod/pull/3#discussion_r1599700243)

### Unit Testing

Unit tests are based on [jscodeshift's test utility](https://github.com/facebook/jscodeshift?tab=readme-ov-file#unit-testing) with `vitest`.

But here the directory structure is a bit different:

```
/subfolder/MyTransform.js
/__tests__/subfolder/MyTransform-test.js
/__testfixtures__/subfolder/MyTransform.input.js
/__testfixtures__/subfolder/MyTransform.output.js
```

## Included Transforms

### React

#### `react.func-default-props-to-params`

```sh
npx @jowapp/codemod react.func-default-props-to-params <path>
```

Converts functional components default props to default params.

#### `react.forward-ref-to-prop`

```sh
npx @jowapp/codemod react.forward-ref-to-prop <path>
```

Converts `forwardRef` to regular prop `ref`.
