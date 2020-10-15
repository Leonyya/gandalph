const express = require('express')
const { exec } = require('child_process')
const next = require('next')
const webpack = require('webpack')
const path = require('path')
const BuildDesktopPayload = require('./lib/bot/franky')
const bundler = require('./lib/build/bundler')
// NextJS init 
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// helper function to log date+text to console:
const log = (text) => {
    console.log(`[${new Date().toLocaleString()}] ${text}`)
  }

BuildDesktopPayload()
 
//
//  This is the development environment setup, if you wanna go prod, comment 
//
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
//  this whole section and run ( yarn export OR yarn start )
// Aedes broker startup
const password_gen = require('./lib/password_gen')
const ws = require('websocket-stream')
const aedesPersistenceRedis = require('aedes-persistence-redis')
const persistence = aedesPersistenceRedis({
    port: 6379,
    host: '127.0.0.1',
    family: 4,
    db: 0,
    maxSessionDelivery: 100,
    packetTTL: (packet) => 10
})
const aedes = require('aedes')({ persistence: persistence })
const server = require('http').createServer()
const wsPort = 8888
const SecureHash = password_gen(30)

ws.createServer({
    server: server
}, aedes.handle)

server.listen(wsPort, function() {
    console.log('> MQTT broker up on port ', wsPort)
    console.log('> Your secure password, auth with it ', SecureHash )
})
aedes.on('client', (client) => {
    let message = `Client ${client.id} just connected`
    log(message)
    aedes.publish({
        cmd: 'publish',
        qos: 2,
        topic: 'sonde',
        payload: message,
        retain: false
    })
})
aedes.on('clientError', function (client, err) {
    console.log('client error', client.id, err.message, err.stack)
})

aedes.on(
    'clientDisconnect',
    (client) => {
        message = `Client ${client.id} just disconnected`
        log(message)
        aedes.publish({
            cmd: 'publish',
            qos: 2,
            topic: 'sonde',
            payload: message,
            retain: false
        })
    }
)

aedes.authenticate = (client, username, password, callback) => (password.toLocaleString() === SecureHash) ? callback(null, true) : callback(true, null)

bundler();

// aedes.subscribe('buildexe', pkgBuildExe(packet, cb), done)