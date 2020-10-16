import mqtt from 'mqtt';
import http from "http";

const client  = mqtt.connect('mqtt://localhost:8888')
let ip_info: string;

/*http.get('http://bot.whatismyipaddress.com', function(res: any){
    res.setEncoding('utf8');
    res.on('data', function(chunk: string){
      ip_info = chunk
    });
});*/

client.on('connect', function () {
  client.subscribe('sonde', function (err: any) {
    if (!err) {
      client.publish('sonde', `First Time connection!`)
    }
  })
})

client.on('message', function (topic: string, message: any) {
  console.log('topic: ',topic ,message.toString())
})