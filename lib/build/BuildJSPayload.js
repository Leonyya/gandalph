export default async function BuildJSPayload() {
    webpack({
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
                    use: [ 
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [ '@babel/preset-env' ]
                            }
                        }
                    ],
                    exclude: /(node_modules)/,
                    test: /\.js$/,

                  }
              ]
          }
    }, (err, stats) => {
        process.stdout.write(stats.toString() + '\n');
        if(err || stats.hasErrors()) {
            console.log('error building')
        }
    })
}