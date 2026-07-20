import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [preact(), tailwindcss()],
    resolve: {
        tsconfigPaths: true,
        alias: {
            '@': import.meta.dirname + '/src',
        },
    },
});
