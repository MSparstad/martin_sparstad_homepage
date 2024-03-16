// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import pluginurl from "@rollup/plugin-url";
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from "@rollup/plugin-babel";
import path from "node:path";
import nodePolyFills from "rollup-plugin-polyfill-node";
import svg from "rollup-plugin-svg";
import globImport from 'rollup-plugin-glob-import';
import css from 'rollup-plugin-css-only'
import images from '@rollup/plugin-image'
import styles from "rollup-plugin-styles";
import css_porter from 'rollup-plugin-css-porter';
import { defineConfig } from 'rollup';

export default {
  input: ['src/main.tsx'],
  output: {
    dir: 'dist',
    // preserveModules: 'true',
    format: 'iife',
    sourcemap: "true",
    paths: {
      'react/jsx-runtime': path.resolve(
        '../../node_modules/react/jsx-runtime.js'
      )
  },
  assetFileNames: 'assets/[name][extname]',
  
},
  plugins: [
    typescript({outDir:"dist/typescript"}),

    commonjs(),

    styles(),
    
    globImport(),

    nodeResolve({
      extensions: ['.js', '.jsx'],
      
    }),

    babel(
      {
        babelHelpers: 'bundled',
        presets: [['@babel/preset-react', { "runtime": "automatic" }]],
        extensions: ['.js', '.jsx']

      }),

    pluginurl(),

    nodePolyFills(),

    images(),

    svg(),

    // css({
    //   output: 'main.css',
    // }),
  ],
  // external: [/\.css$/],
};