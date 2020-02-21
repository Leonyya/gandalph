const path = require('path');

module.exports = {
    entry: [
      'regenerator-runtime/runtime',
      './builder/desktop/src/index.js'
    ],
    target: 'node',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, '/builder/desktop/build/js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                exclude: /(node_modules)/,
                test: /\.js$/
            }
        ]
    }
}