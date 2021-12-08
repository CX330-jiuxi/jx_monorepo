import { IBundleOptions } from 'father-build/src/types';

const config: IBundleOptions = {
  esm: 'rollup',
  cjs: 'rollup',
  extraBabelPlugins: [['transform-remove-console', { exclude: ['error', 'warn', 'info'] }]],
};
export default config;
