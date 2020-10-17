"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aedes_1 = require("aedes");
const http_1 = require("http");
const websocket_stream_1 = __importDefault(require("websocket-stream"));
const aedes_persistence_redis_1 = __importDefault(require("aedes-persistence-redis"));
const Dropper_1 = require("./Bot/Dropper");
const hashgen_1 = __importDefault(require("./Security/hashgen"));
const persistence = new aedes_persistence_redis_1.default({
    port: 6379,
    host: '127.0.0.1',
    family: 4,
    db: 0,
    maxSessionDelivery: 100,
    packetTTL: (packet) => 10
});
const sechash = Buffer.from(hashgen_1.default(30));
const broker = aedes_1.Server({
    concurrency: 100,
    heartbeatInterval: 60000,
    connectTimeout: 30000,
    id: 'aedes',
    persistence: persistence,
    preConnect: (client, packet, callback) => {
        console.log('Client attempting to log');
        if (client.req) {
            callback(new Error('not websocket stream'), false);
            console.log("Client request, using websockets?");
        }
        else {
            callback(null, true);
        }
    },
    authenticate: (client, username, password, callback) => {
        if (username && password) {
            callback(null, true);
        }
        else {
            const error = new Error();
            error.returnCode = 1;
            callback(error, false);
        }
        callback(null, true);
    },
    authorizePublish: (client, packet, callback) => {
        if (packet.topic === 'aaaa') {
            return callback(new Error('wrong topic'));
        }
        if (packet.topic === 'bbb') {
            packet.payload = Buffer.from('overwrite packet payload');
        }
        callback(null);
    },
    authorizeSubscribe: (client, sub, callback) => {
        if (sub.topic === 'aaaa') {
            return callback(new Error('wrong topic'));
        }
        if (sub.topic === 'bbb') {
            // overwrites subscription
            sub.qos = 2;
        }
        callback(null, sub);
    },
});
broker.on('closed', () => {
    console.log('closed');
});
broker.on('client', client => {
    console.log(`client: ${client.id} connected`);
});
broker.on('clientReady', client => {
    console.log(`client: ${client.id} is ready`);
});
broker.on('clientDisconnect', client => {
    console.log(`client: ${client.id} disconnected`);
});
broker.on('keepaliveTimeout', client => {
    console.log(`client: ${client.id} timed out`);
});
broker.on('connackSent', (packet, client) => {
    console.log(`client: ${client.id} connack sent`);
});
broker.on('clientError', client => {
    console.log(`client: ${client.id} error`);
});
broker.on('connectionError', client => {
    console.log('connectionError ');
});
broker.on('ping', (packet, client) => {
    console.log(`client: ${client.id} ping with packet ${packet.cmd}`);
});
broker.on('publish', (packet, client) => {
    console.log(`client: ${client} published packet ${packet.cmd}`);
});
broker.on('ack', (packet, client) => {
    console.log(`client: ${client.id} ack with packet ${packet.cmd}`);
});
// Subs events
broker.on('subscribe', (subscriptions, client) => {
    console.log(`client: ${client.id} subscribe`);
});
broker.on('unsubscribe', (subscriptions, client) => {
    console.log(`client: ${client.id} unsubscribe`);
});
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
    Dropper_1.Dropper().then(() => {
        console.log("Bot built");
    });
}
catch (e) {
    console.error(e);
}
const server = http_1.createServer();
websocket_stream_1.default.createServer({ server: server }, () => broker.handle);
server.listen(8888, function () {
    console.log('Secure HASH: ' + sechash);
});
//broker.close()
/*const server = createServer(broker.handle)
server.listen(8888, () => {
  console.log('BROKER STARTED WTF IS GOING ONNN')
})*/ 
//# sourceMappingURL=main.js.map