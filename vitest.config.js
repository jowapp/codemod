import { configDefaults, defineConfig } from 'vitest/config'

export default (configEnv) => {
  const { mode } = configEnv
  const config = {
    test: {
      environment: 'node',
      include: [...configDefaults.include, '__tests__/**/*.js'],
      globals: true,
    },
  }
  return defineConfig(config)
}
