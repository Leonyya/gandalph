"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mqtt_1 = __importDefault(require("mqtt"));
//import http from "http";
const client = mqtt_1.default.connect('mqtt://localhost:8888');
let ip_info;
/*http.get('http://bot.whatismyipaddress.com', function(res: any){
    res.setEncoding('utf8');
    res.on('data', function(chunk: string){
      ip_info = chunk
    });
});*/
client.on('connect', function () {
    client.subscribe('sonde', function (err) {
        if (!err) {
            client.publish('sonde', `First Time connection!`);
        }
    });
});
client.on('message', function (topic, message) {
    console.log('topic: ', topic, message.toString());
});
//# sourceMappingURL=Egg.js.map