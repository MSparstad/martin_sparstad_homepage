// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';

export default {
  input: ['tmp/src/main.js'],
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  plugins: [typescript()]
  
};