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
import { defineConfig } from 'rollup';

export default {
  input: ['tmp/main.js'],
  output: {
    dir: 'dist',
    // preserveModules: 'true',
    format: 'iife',
    paths: {
      'react/jsx-runtime': path.resolve(
        '../../node_modules/react/jsx-runtime.js'
      )
  }
},
  plugins: [

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
      
    commonjs(),

    pluginurl(),

    nodePolyFills(),
    
    svg(),
  ],
  external: [/\.css$/],
};