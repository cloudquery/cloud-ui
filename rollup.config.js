import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import terser from '@rollup/plugin-terser';
import mergeFilesPlugin from './merge-files-plugin.js';

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
      entryFileNames: '[name].cjs.js',
    },
    {
      dir: 'dist',
      format: 'esm',
      sourcemap: true,
      entryFileNames: '[name].esm.js',
    },
  ],
  external: [
    /^@mui\/material.*/,
    /^@mui\/icons-material.*/,
    /^@mui\/lab.*/,
    /^@mui\/system.*/,
    'react',
    'react-dom',
    'tslib',
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json', outDir: 'dist' }),
    terser({
      format: {
        comments: /webpackIgnore:/,
      },
    }),
    mergeFilesPlugin({
      sourceFile: './lib/theme/types.d.ts',
      targetFile: 'index.d.ts',
    }),
  ],
};
