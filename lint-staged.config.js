module.exports = {
  '*.js': ['prettier --write', 'vitest related --run'],
  '*.{json,md}': ['prettier --write'],
}
