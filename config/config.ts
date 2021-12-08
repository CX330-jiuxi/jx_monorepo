import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'PanGu',
  description: 'PanGu',
  favicon: '/favicon.ico',
  logo: '/favicon.png',
  outputPath: 'docs-dist',
  mode: 'site',
  dynamicImport: {},
  // // more config: https://d.umijs.org/config
  cssLoader: {
    localsConvention: 'camelCase',
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
  ],
  // // alias: {},
  // forkTSChecker: {},
});
