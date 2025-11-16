import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/js/app.js',

                // Your JS files
                'resources/js/config.js',
                'resources/js/api.js',
                'resources/js/sweetalert.js',
                'resources/js/auth.js',
                'resources/js/pages/login.js',
                'resources/js/pages/register.js',
                'resources/js/pages/dashboard.js',
                'resources/js/pages/profile.js',
                'resources/js/pages/admin-users.js',
            ],
            refresh: true,
        }),

        // Tailwind plugin
        tailwindcss(),
    ],

    resolve: {
        alias: {
            '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
        }
    },

    build: {
        outDir: 'public/build',
        manifest: true,
        rollupOptions: {
            output: {
                manualChunks: undefined,
            },
        },
    },
});
