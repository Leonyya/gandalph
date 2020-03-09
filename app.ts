import * as express from 'express'
import { exec } from 'child_process'
import * as next from 'next'
import * as ws from 'websocket-stream'
import * as path from 'path'
import * as pkg from 'pkg'
import * as webpack from 'webpack'

// Aedes init and import
const aedes = require('aedes')()


// Build desktop app with PKG
async function BuildDesktopPayload() {
    await pkg.exec([ 'builder/desktop/src/index.js', '--target', 'host', '--output', 'builder/desktop/build/bin/app' ])
}

// Bundle, transpile and obfuscate with webpack + loader then drop the payload
async function BuildJSPayload() {
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

BuildDesktopPayload()

if( process.argv[2] && process.argv[2] == "dev") {  

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

} else if(process.argv[2] == "deploy"){
    exec('npm run export', (err, stdout, stderr) => {
        if (err) {
            return
        }
        // the *entire* stdout and stderr (buffered)
        console.log(`${stdout}`)
        console.log(`stderr: ${stderr}`)
        console.log('> Client built and exported to static HTML')
        console.log('> In a few minutes will become available at out/index.html')
        console.log('> Message broker is now monolitic')
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
        console.log('> In a few minutes will become available at http://localhost:3000/')
    
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

setInterval(()=> {
   // aedes.publish('sonde')
}, 5000)


aedes.authenticate = (client, username, password, callback) => callback(null, true)

