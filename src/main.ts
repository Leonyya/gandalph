import { Server, Client, AuthenticateError, AedesPublishPacket, PublishPacket, Subscription } from 'aedes'
import { createServer, Socket } from 'net';
import { createServer as httpCreateServer } from 'http';
import ws from 'websocket-stream';
import { Packet } from 'mqtt-packet';
import RedisPersistence from 'aedes-persistence-redis';

import { Dropper } from "./Bot/Dropper";
import hash from './Security/hashgen';

const persistence = new RedisPersistence({
  port: 6379,
  host: '127.0.0.1',
  family: 4,
  db: 0,
  maxSessionDelivery: 100,
  packetTTL: (packet: any) => 10
})

const sechash = Buffer.from(hash(30));
const broker = Server({
  concurrency: 100,
  heartbeatInterval: 60000,
  connectTimeout: 30000,
  id: 'aedes',
  persistence:persistence,
  preConnect: (client: Client, packet: Packet, callback) => {
    console.log('Client attempting to log')
    if (client.req) {
      callback(new Error('not websocket stream'), false)
      console.log("Client request, using websockets?")
    } else {
      callback(null, true)
    }
  },
  authenticate: (client: Client, username: string, password: Buffer, callback) => {
    if (username && password) {
      callback(null, true)
    } else {
      const error = new Error() as AuthenticateError
      error.returnCode = 1

      callback(error, false)
    }
    callback(null,true)
  },
  authorizePublish: (client: Client, packet: PublishPacket, callback) => {
    if (packet.topic === 'aaaa') {
      return callback(new Error('wrong topic'))
    }

    if (packet.topic === 'bbb') {
      packet.payload = Buffer.from('overwrite packet payload')
    }

    callback(null)
  },
  authorizeSubscribe: (client: Client, sub: Subscription, callback) => {
    if (sub.topic === 'aaaa') {
      return callback(new Error('wrong topic'))
    }

    if (sub.topic === 'bbb') {
      // overwrites subscription
      sub.qos = 2
    }

    callback(null, sub)
  },
  /*authorizeForward: (client: Client, packet: AedesPublishPacket) => {
    if (packet.topic === 'aaaa' && client.id === 'I should not see this') {
      return null
      // also works with return undefined
    } else if (packet.topic === 'aaaa' && client.id === 'I should not see this either') {
      return
    }

    if (packet.topic === 'bbb') {
      packet.payload = Buffer.from('overwrite packet payload')
    }

    return packet
  }*/
})


broker.on('closed', () => {
  console.log('closed')
})

broker.on('client', client => {
  console.log(`client: ${client.id} connected`)
})

broker.on('clientReady', client => {
  console.log(`client: ${client.id} is ready`)
})

broker.on('clientDisconnect', client => {
  console.log(`client: ${client.id} disconnected`)
})

broker.on('keepaliveTimeout', client => {
  console.log(`client: ${client.id} timed out`)
})

broker.on('connackSent', (packet, client) => {
  console.log(`client: ${client.id} connack sent`)
})

broker.on('clientError', client => {
  console.log(`client: ${client.id} error`)
})

broker.on('connectionError', client => {
  console.log('connectionError ')
})

broker.on('ping', (packet, client) => {
  console.log(`client: ${client.id} ping with packet ${packet.cmd}`)
})

broker.on('publish', (packet, client) => {
  console.log(`client: ${client} published packet ${packet.cmd}`)
})

broker.on('ack', (packet, client) => {
  console.log(`client: ${client.id} ack with packet ${packet.cmd}`)
})
// Subs events
broker.on('subscribe', (subscriptions, client) => {
  console.log(`client: ${client.id} subscribe`)
})

broker.on('unsubscribe', (subscriptions, client) => {
  console.log(`client: ${client.id} unsubscribe`)
})


/*broker.subscribe('aaa', (packet: AedesPublishPacket, cb) => {
  console.log('cmd')
  console.log(packet.cmd)
  cb()
}, () => {
  console.log('Broker connected')
})*/

/*broker.unsubscribe('aaaa', (packet: AedesPublishPacket, cb) => {
  console.log('cmd')
  console.log(packet.cmd)
  cb()
}, () => {
  console.log('done unsubscribing')
})*/

try {
  Dropper().then(()=> {
    console.log("Bot built")
  })
} catch(e) {
  console.error(e)
}


const server = httpCreateServer()
ws.createServer({ server: server}, () => broker.handle)
server.listen(8888, function () {
  console.log('Secure HASH: ' + sechash)
})
//broker.close()

/*const server = createServer(broker.handle)
server.listen(8888, () => {
  console.log('BROKER STARTED WTF IS GOING ONNN')
})*/