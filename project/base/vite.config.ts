import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'import',
            {
              libraryName: 'antd',
              libraryDirectory: 'es',
              style: 'css',
            },
          ],
        ],
      },
    }),
  ],
  // build: {
  // rollupOptions: {
  //   // 确保外部化处理那些你不想打包进库的依赖
  //   external: ['antd'],
  //   output: {
  //     // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
  //     globals: {
  //       antd: 'antd',
  //     },
  //   },
  // },
  // },
});
