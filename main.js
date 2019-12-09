const mosca = require('mosca')
const blessed = require('blessed')
const express = require('express')
const { exec } = require('child_process');
const next = require('next')
// Restart
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

let ascoltatore = {
    type: 'redis',
    redis: require('redis'),
    db: 12,
    port: 6379,
    return_buffers: true,
    host: "localhost"
}

let moscaSettings = {
    port: 1883,
    backend: ascoltatore,
}

const authenticate = (client,username,password, callback) => {
    let authorized = (username === 'alice' && password.toString() === 'secret')
    if(authorized) client.user = username
    callback(null,authorized)
}
const authorizePublish = (client, topic, payload, callback) => {
    callback(null, client.user == topic.split('/')[1])
}
const authorizeSuscribe = (client, topic, callback) => {
    callback(null, client.user == topic.split('/')[1])
}
let server = new mosca.Server(moscaSettings)
server.on('ready', ()=> {
    server.authenticate = authenticate
    server.authorizePublish = authorizePublish
    server.authorizeSuscribe = authorizeSuscribe
    console.log('> MQTT broker is ready at ::1883')
})


server.on('clientConnected', function(client) {
    console.log('client connected', client.id)
})

server.on('published', function(packet, client){
    console.log('Published', packet.topic, packet.payload.toString())
})

server.on('clientDisconnected', function(client) {
    console.log('Client Disconnected:', client.id);
});






