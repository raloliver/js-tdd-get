import { join } from 'path'

const include = join(__dirname, 'src')

export default {
  mode: 'development',
  entry: './src/index',
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'getWrapper',
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader' },
    ]
  }
}
