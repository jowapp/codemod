# codemod

Simple set of codemod transformations

## Usage

```sh
npx @jowapp/codemod <transform> <path> [...options]
```

- `transform` - name of transform, see available transforms below.
- `path` - files or directory to transform
- use the `--dry` option for a dry-run and use `--print` to print the output for comparison

This will start an interactive wizard, and then run the specified transform.

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
