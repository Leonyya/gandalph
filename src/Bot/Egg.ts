import Paho from '../../vendor/paho-mqtt';

  /*http.get('http://bot.whatismyipaddress.com', function(res: any){
      res.setEncoding('utf8');
      res.on('data', function(chunk: string){
        ip_info = chunk
      });
  });*/
var location = {
  hostname: 'localhost',
  port: '8888'
}
  // Create a client instance
var client = new Paho.Client(location.hostname, Number(location.port),"","clientId");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({userName: 'test', password: 'test', onSuccess:onConnect});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  /*client.subscribe("World");
  let message = new Paho.MQTT.Message("Hello");
  message.destinationName = "World";
  client.send(message);*/
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
}