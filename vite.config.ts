import { defineConfig, loadEnv } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite';

//TODO fix types
// https://vite.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return defineConfig({
    plugins: [svelte(), tailwindcss()],
    server: {
      port: 3000
    },
    base: env.VITE_BASE_URL
  })
}
