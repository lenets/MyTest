import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject';
import { createHtmlPlugin } from 'vite-plugin-html';
import dynamicImport from 'vite-plugin-dynamic-import';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const favIcon = `VITE_FAVICON_${env['VITE_SITE']}`;
  const title = `VITE_TITLE_${env['VITE_SITE']}`;

  return defineConfig({
    build: {
      rollupOptions: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          return 'page';
        },
      },
    },
    css: {
      modules: {
          scopeBehaviour: 'global'
      }
    },
    plugins: [
      vue(),
      vitePluginFaviconsInject(env[favIcon]),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: env[title],
          }
        }
      }),
      dynamicImport(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  });
}
