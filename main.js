const express = require('express')
const { exec } = require('child_process')
const next = require('next')
const ws = require('websocket-stream')
const webpack = require('webpack')
const path = require('path')
const password_gen = require('./lib/password_gen')
const aedesPersistenceRedis = require('aedes-persistence-redis')
const BuildDesktopPayload = require('./lib/build/BuildDesktopPayload')
const persistence = aedesPersistenceRedis({
    port: 6379,
    host: '127.0.0.1',
    family: 4,
    db: 0,
    maxSessionDelivery: 100,
    packetTTL: (packet) => 10
})

// Aedes broker startup
const aedes = require('aedes')({ persistence: persistence })
const server = require('net').createServer(aedes.handle)
const port = 1883
const wsPort = 8888
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const SecureHash = password_gen(30)

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

ws.createServer({
    server: server
}, aedes.handle)

server.listen(wsPort, function() {
    console.log('> MQTT broker up on port ', wsPort)
    console.log('> Your secure password, auth with it ', SecureHash )
})
aedes.on('client', (client) => {
    console.log('new client', client.id)
})
aedes.on('clientError', function (client, err) {
    console.log('client error', client.id, err.message, err.stack)
})

aedes.authenticate = (client, username, password, callback) => (password == SecureHash) ? callback(null, true) : callback(true, null)

// aedes.subscribe('buildexe', pkgBuildExe(packet, cb), done)