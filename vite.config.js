import path from 'path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
var projectRoot = path.resolve(__dirname);
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr({ exportAsDefault: true })],
    define: {
        global: 'window',
    },
    server: {
        port: 3000,
        proxy: {
            '/api': 'http://127.0.0.1:3011',
        },
    },
    preview: {
        port: 3000,
    },
    resolve: {
        alias: {
            components: path.resolve(projectRoot, 'src/components/'),
            constants: path.resolve(projectRoot, 'src/constants/'),
            hooks: path.resolve(projectRoot, 'src/hooks/'),
            assets: path.resolve(projectRoot, 'src/assets/'),
            pages: path.resolve(projectRoot, 'src/pages/'),
            services: path.resolve(projectRoot, 'src/services/'),
            styles: path.resolve(projectRoot, 'src/styles/'),
            utils: path.resolve(projectRoot, 'src/utils/'),
            contracts: path.resolve(projectRoot, 'src/contracts/'),
        },
    },
});