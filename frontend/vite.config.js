import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,    // Le port à utiliser
    host: '0.0.0.0', // Permet d'exposer l'app à l'extérieur de Docker
  },
});
