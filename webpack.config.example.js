const path = require("path");

module.exports = {
    mode: "development",
    entry: './example/index',
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
      filename: 'example.js',
      path: path.resolve(__dirname, 'example/static'),
    }
}