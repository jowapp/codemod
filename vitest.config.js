import { configDefaults, defineConfig } from 'vitest/config'

export default (configEnv) => {
  const { mode } = configEnv
  const config = {
    test: {
      environment: 'node',
      include: [...configDefaults.include, '**/__tests__/**/*.[jt]s?(x)'],
      globals: true,
    },
  }
  return defineConfig(config)
}
