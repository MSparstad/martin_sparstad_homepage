// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import svgr from "vite-plugin-svgr";

export default {
  input: 'src/main.tsx',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [typescript(), svgr()]
};