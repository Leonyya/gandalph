import express from 'express'
import { exec } from 'child_process';
import next from 'next'
import webpack from 'webpack'
import path from 'path'
import { BuildDesktopPayload } from './BuildDesktopPayload'
import { generatePassword } from '../password_gen'
import ws from 'websocket-stream'
import aedesPersistenceRedis from 'aedes-persistence-redis'

// NextJS init 
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle  = app.getRequestHandler()

// helper function to log date+text to console:
const log = (text: string) => {
    console.log(`[${new Date().toLocaleString()}] ${text}`)
  }

BuildDesktopPayload()
 
//
//  This is the development environment setup, if you wanna go prod, comment 
//
app.prepare()
.then(() => {
    const server = express()
        
    server.get('*', (req: any, res: any) => {
        return handle(req, res)
    })
        
    server.listen(3000, (err: any) => {
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
const SecureHash = generatePassword(30)

ws.createServer({
    server: server
}, aedes.handle)

server.listen(wsPort, function() {
    console.log('> MQTT broker up on port ', wsPort)
    console.log('> Your secure password, auth with it ', SecureHash )
})
aedes.on('client', (client) => {
    let message = `Client ${client.id} just connected from`
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
        let message = `Client ${client.id} just disconnected`
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

aedes.authenticate = (client, username, password, callback) => (password.toLocaleString() === "1234") ? callback(null, true) : callback(null, true)

// aedes.subscribe('buildexe', pkgBuildExe(packet, cb), done)