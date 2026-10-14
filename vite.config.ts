import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      // Hosts adicionais autorizados a aceder ao servidor de desenvolvimento.
      // Por omissao o Vite aceita apenas localhost. Para expor atraves de um tunel,
      // proxy ou dominio proprio, defina a variavel de ambiente ALLOWED_HOSTS.
      // Ex.: ALLOWED_HOSTS=".meudominio.com,192.168.1.50" npm run dev
      allowedHosts: process.env.ALLOWED_HOSTS
        ? process.env.ALLOWED_HOSTS.split(',').map((h) => h.trim()).filter(Boolean)
        : [],
    },
  };
});
