import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext'
  },
  resolve: {
    alias: {
      'react/jsx-runtime': path.resolve('./node_modules/react/jsx-runtime.js')
    }
  }
});
