// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; 

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext' 
  },
  resolve: {
    alias: {
      'react/jsx-runtime': 'react/jsx-runtime.js' 
    }
  }
});
