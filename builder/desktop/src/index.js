const mqtt = require('mqtt')
const os = require('os')
const client  = mqtt.connect('mqtt://localhost:8888')
const http = require('http')
let ip_info
const client_platform = os.userInfo() + ' ' + os.arch() + ' ' + os.platform() + ' '

http.get('http://bot.whatismyipaddress.com', function(res){
    res.setEncoding('utf8');
    res.on('data', function(chunk){
      ip_info = chunk
    });
});

if(os.platform() == "win32") require('./windows')
else require('./nix')

client.on('connect', function () {
  client.subscribe('sonde', function (err) {
    if (!err) {
      client.publish('sonde', `First Time connection! ${ip_info} ${client_platform}`)
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log('topic: ',topic ,message.toString())
  //client.end()
})
console.log(os.platform())