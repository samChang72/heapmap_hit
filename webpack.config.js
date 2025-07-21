const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'heapmap.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'HeapMap',
      type: 'umd',
      export: 'default'
    },
    globalObject: 'this',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            compilerOptions: {
              declaration: false,
              declarationMap: false
            }
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devtool: 'source-map',
  mode: 'production'
};