const express = require('express')
//const { exec } = require('child_process')
const aedes = require('aedes')()
const next = require('next')
const ws = require('websocket-stream')
const webpack = require('webpack')
const path = require('path')
const { exec } = require('pkg')


async function pkgBuildExe(packet, cb) {
    await exec([ 'builder/desktop/src/index.js', '--target', 'host', '--output', 'builder/desktop/build/bin/app' ])


/*    webpack({
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
*/
}
pkgBuildExe()

/*if( process.argv[2] && process.argv[2] == "dev") {  

    const dev = process.env.NODE_ENV !== 'production'
    const app = next({ dev })
    const handle = app.getRequestHandler()
    
    app.prepare()
    .then(() => {
      const server = express()
        
      server.get('*', (req, res) => {
        return handle(req, res)
      })
        
      server.listen(3000, (err) => {
        if (err) throw err
        console.log('> Dev server ready on http://localhost:3000')
      })
    })
    .catch((ex) => {
      console.error(ex.stack)
      process.exit(1)
    })
} else {
    exec('npm run build', (err, stdout, stderr) => {
        if (err) {
            return
        }
    
        // the *entire* stdout and stderr (buffered)
        console.log(`${stdout}`)
        console.log(`stderr: ${stderr}`)
        console.log('> Client built')
        console.log('> In a few minuts will become available at http://localhost:3000/')
    
        exec('npm run start', (err,stdout,stderr) => {
            if(err) {
                return
            }
            console.log(`${stdout}`);
            console.log('> Wapp deployed')
            console.log(`stderr: ${stderr}`)
      })
    });
}
*/ 
// Aedes broker startup
const server = require('net').createServer(aedes.handle)
const port = 1883
const wsPort = 8888

ws.createServer({
    server: server
}, aedes.handle)
server.listen(wsPort, function() {
    console.log('> MQTT broker up on port ', port)
})
aedes.on('client', (client) => {
    console.log('new client', client.id)
})
aedes.on('clientError', function (client, err) {
    console.log('client error', client.id, err.message, err.stack)
})
/*aedes.authenticate = (client, username, password, callback) => {
    if(username == 'matteo' && password == '1234') {
        callback(null, true)
    } else {
        let error = new Error('Auth error')
        error.returnCode = 1
        callback(error,null)
    }
}*/

// aedes.subscribe('buildexe', pkgBuildExe(packet, cb), done)