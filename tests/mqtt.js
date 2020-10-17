const mqtt = require('mqtt')
console.log('wait waht?')
let client = mqtt.connect('ws://localhost:8888/', {
    username: 'test',
    password: 'test'
})
//let client = new Paho.Client("mqtt://localhost",/* Number(8888), "/", "clientId"*/)
client.on('connect', (message) => {
    console.log(`${new Date().toLocaleString()} connected to broker`)
    client.subscribe('aaa')
    client.publish('aaa', 'Connected from browser')
})

client.on('message',(topic, message) => {
    console.log(`Message received on topic ${topic}: ${message.toString()}`)
})