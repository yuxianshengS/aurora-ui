import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

/**
 * 两套构建:
 * - 默认 `vite build`: 打演示站点 (deploy 到 GitHub Pages)
 * - `vite build --mode lib`: 打 npm 组件库 (ESM + CJS + .d.ts)
 */
export default defineConfig(({ mode }) => {
  if (mode === 'lib') {
    return {
      plugins: [
        react(),
        dts({
          include: ['src/components/**/*', 'src/lib.ts'],
          exclude: ['**/*.test.*', '**/*.stories.*'],
          outDir: 'dist',
          insertTypesEntry: true,
        }),
      ],
      publicDir: false, // 不要把 public/ (favicon 等) 复制进 npm 包
      build: {
        outDir: 'dist',
        sourcemap: true,
        cssCodeSplit: false,
        lib: {
          entry: resolve(__dirname, 'src/lib.ts'),
          name: 'AuroraUI',
          formats: ['es', 'cjs'],
          fileName: (format) => `aurora-ui.${format === 'es' ? 'mjs' : 'cjs'}`,
        },
        rollupOptions: {
          // 这些依赖不打进包, 让用户项目里自己装 (peer)
          external: [
            'react',
            'react/jsx-runtime',
            'react-dom',
            'react-dom/client',
            'echarts',
            'echarts-gl',
            'html2canvas',
            'jspdf',
          ],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              echarts: 'echarts',
            },
            assetFileNames: (assetInfo) => {
              if (assetInfo.name && assetInfo.name.endsWith('.css')) {
                return 'aurora-ui.css';
              }
              return 'assets/[name]-[hash][extname]';
            },
          },
        },
      },
    };
  }

  // 默认: 打演示站点
  return {
    base: '/aurora-ux/',
    plugins: [react()],
    server: {
      port: 5173,
      open: false,
    },
  };
});
