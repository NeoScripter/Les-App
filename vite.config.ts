import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import { defineConfig } from 'vite';

const isDev = process.env.NODE_ENV === 'development';

// https://vite.dev/config/
export default defineConfig({
    plugins: [preact(), tailwindcss()],
    resolve: {
        tsconfigPaths: true,
        alias: {
            '@': import.meta.dirname + '/src',
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'https://les.myfantasy.ru/',
                changeOrigin: true,
                cookieDomainRewrite: {
                    '*': 'localhost',
                },
            },
        },
        https: isDev
            ? {
                  key: fs.readFileSync('./localhost+2-key.pem'),
                  cert: fs.readFileSync('./localhost+2.pem'),
              }
            : undefined,
    },
});
