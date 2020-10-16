"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aedes_1 = require("aedes");
const net_1 = require("net");
const broker = aedes_1.Server({
    concurrency: 100,
    heartbeatInterval: 60000,
    connectTimeout: 30000,
    id: 'aedes',
    preConnect: (client, packet, callback) => {
        if (client.req) {
            callback(new Error('not websocket stream'), false);
        }
        if (client.conn instanceof net_1.Socket && client.conn.remoteAddress === '::1') {
            callback(null, true);
        }
        else {
            callback(new Error('connection error'), false);
        }
    },
    authenticate: (client, username, password, callback) => {
        if (username === 'test' && password === Buffer.from('test') && client.version === 4) {
            callback(null, true);
        }
        else {
            const error = new Error();
            error.returnCode = 1;
            callback(error, false);
        }
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
    authorizeForward: (client, packet) => {
        if (packet.topic === 'aaaa' && client.id === 'I should not see this') {
            return null;
            // also works with return undefined
        }
        else if (packet.topic === 'aaaa' && client.id === 'I should not see this either') {
            return;
        }
        if (packet.topic === 'bbb') {
            packet.payload = Buffer.from('overwrite packet payload');
        }
        return packet;
    }
});
const server = net_1.createServer(broker.handle);
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
    console.log('connectionError');
});
broker.on('ping', (packet, client) => {
    console.log(`client: ${client.id} ping with packet ${packet.cmd}`);
});
broker.on('publish', (packet, client) => {
    console.log(`client: ${client.id} published packet ${packet.cmd}`);
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
broker.subscribe('aaaa', (packet, cb) => {
    console.log('cmd');
    console.log(packet.cmd);
    cb();
}, () => {
    console.log('done subscribing');
});
broker.unsubscribe('aaaa', (packet, cb) => {
    console.log('cmd');
    console.log(packet.cmd);
    cb();
}, () => {
    console.log('done unsubscribing');
});
//broker.close()
//# sourceMappingURL=App.js.map