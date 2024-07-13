const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MergeFilesPlugin = require('./merge-files-plugin');

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  externals: [
    'react',
    'react-dom',
    /^@mui\/material.*/,
    /^@mui\/icons-material.*/,
    /^@mui\/lab.*/,
    /^@mui\/system.*/,
    /^@emotion\/react.*/,
    /^@emotion\/styled.*/,
    'yup',
    'humanize-string',
  ],
  plugins: [
    new MergeFilesPlugin({
      sourceFile: './lib/theme/types.d.ts', 
      targetFile: 'index.d.ts'
    })
  ],
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false,
      terserOptions: {
        format: {
          comments: false,
        },
      },
    })],
  },
};
