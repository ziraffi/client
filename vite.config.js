import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';
import autoprefixer from 'autoprefixer';
import process from 'process';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const config = {
    plugins: [
      react(),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
      visualizer({
        filename: './dist/stats.html',
        open: true,
        gzipSize: true,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src'),
      },
    },
    assetsInclude: [
      'src/assets/images',
      'src/assets/fonts',
      'src/assets/icons',
      'src/assets/styles',
      'src/assets/js',
    ],    
    root: path.resolve(process.cwd(), '.'),
    publicDir: path.resolve(process.cwd(), 'public'),
    base: env.VITE_BASE_URL || '/',
    build: {
      outDir: path.resolve(process.cwd(), 'dist'),
      emptyOutDir: true,
      rollupOptions: {
        input: path.resolve(process.cwd(), 'index.html'),
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
      target: 'esnext',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      cssCodeSplit: true,
      sourcemap: command === 'serve',
    },
    server: {
      port: 5175,
      open: true,
      cors: true,
      strictPort: true,
      hmr: {
        overlay: true,
      },
    },
    preview: {
      port: 4173,
      open: true,
      strictPort: true,
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
      postcss: {
        plugins: [autoprefixer()],
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
      exclude: ['your-local-package'],
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    esbuild: {
      jsxInject: `import React from 'react'`,
    },
  };

  if (command === 'serve') {
    config.build.rollupOptions = {
      input: path.resolve(process.cwd(), 'index.html'),
      preserveEntrySignatures: 'strict',
    };
  } else {
    config.build.rollupOptions.output.manualChunks = (id) => {
      if (id.includes('node_modules')) {
        return 'vendor';
      }
    };
  }

  return config;
});