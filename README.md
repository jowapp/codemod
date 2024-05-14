# codemod

Simple set of codemod transformations

## Usage

```sh
npx @jowtech/codemod <transform> <path> [...options]
```

- `transform` - name of transform, see available transforms below.
- `path` - files or directory to transform (**use quotes**)
- use the `--dry` option for a dry-run and use `--print` to print the output for comparison

This will start an interactive wizard, and then run the specified transform.

All [jscodeshift's options](https://github.com/facebook/jscodeshift?tab=readme-ov-file#usage-cli) are supported, and defaults are the same than the one of jscodeshift's CLI.

> [!NOTE]
> jscodeshift's option defaults apply only to its CLI, its API has none, except the parser, which defaults to `@babel/parser` (see `babel5Compat.js`)
> All options are also passed to the transformer, which means you can supply custom options that are not listed here.

## Included Transforms

### Migrate to React 19

#### `react.func-default-props-to-params`

```sh
npx @jowtech/codemod react.func-default-props-to-params <path>
```

Converts functional components default props onto default parameters.

#### `react.forward-ref-to-prop`

```sh
npx @jowtech/codemod react.forward-ref-to-prop <path>
```

Converts `forwardRef` to regular `ref` prop.

## Testing

```sh
yarn test:run
## or
yarn test:watch
```
