var express_1 = require('express');
var next_1 = require('next');
var BuildDesktopPayload_1 = require('./BuildDesktopPayload');
var password_gen_1 = require('../password_gen');
var websocket_stream_1 = require('websocket-stream');
var aedes_persistence_redis_1 = require('aedes-persistence-redis');
// NextJS init 
var dev = process.env.NODE_ENV !== 'production';
var app = next_1.default({ dev: dev });
var handle = app.getRequestHandler();
// helper function to log date+text to console:
var log = function (text) {
    console.log("[" + new Date().toLocaleString() + "] " + text);
};
BuildDesktopPayload_1.BuildDesktopPayload();
//
//  This is the development environment setup, if you wanna go prod, comment 
//
app.prepare()
    .then(function () {
    var server = express_1.default();
    server.get('*', function (req, res) {
        return handle(req, res);
    });
    server.listen(3000, function (err) {
        if (err)
            throw err;
        console.log('> Dev server ready on http://localhost:3000');
    });
})
    .catch(function (ex) {
    console.error(ex.stack);
    process.exit(1);
});
//  this whole section and run ( yarn export OR yarn start )
// Aedes broker startup
var persistence = aedes_persistence_redis_1.default({
    port: 6379,
    host: '127.0.0.1',
    family: 4,
    db: 0,
    maxSessionDelivery: 100,
    packetTTL: function (packet) { return 10; }
});
var aedes = require('aedes')({ persistence: persistence });
var server = require('http').createServer();
var wsPort = 8888;
var SecureHash = password_gen_1.generatePassword(30);
websocket_stream_1.default.createServer({
    server: server
}, aedes.handle);
server.listen(wsPort, function () {
    console.log('> MQTT broker up on port ', wsPort);
    console.log('> Your secure password, auth with it ', SecureHash);
});
aedes.on('client', function (client) {
    var message = "Client " + client.id + " just connected from";
    log(message);
    aedes.publish({
        cmd: 'publish',
        qos: 2,
        topic: 'sonde',
        payload: message,
        retain: false
    });
});
aedes.on('clientError', function (client, err) {
    console.log('client error', client.id, err.message, err.stack);
});
aedes.on('clientDisconnect', function (client) {
    var message = "Client " + client.id + " just disconnected";
    log(message);
    aedes.publish({
        cmd: 'publish',
        qos: 2,
        topic: 'sonde',
        payload: message,
        retain: false
    });
});
aedes.authenticate = function (client, username, password, callback) { return (password.toLocaleString() === "1234") ? callback(null, true) : callback(null, true); };
// aedes.subscribe('buildexe', pkgBuildExe(packet, cb), done) 
//# sourceMappingURL=app.js.map