# Gandalph
Gandalph is MQTT architecture based botnet (Proof Of Concept) with the following and unique features. 

The botmaster client runs in every browser, and you could upload your client UI to a server and do cross-requests to the core message broker of the botnet. The bot builder is essentially for Javascript-based DDoS attack. There's some sort of compatibility for desktop platforms but still experimental. Looking to move forward

## What's capable of
- Telemetry of connected bots in QoS 1 and 2
- Running 1000 clients / 30,000 messages per minute avg concurrencies.
- DDoS attack

## Upcoming
- Webassembly module injection in-the-wild.
- Migrate to other message broker core in-the-wild
- Monero and Electroneum stratum mining pool
  
( Implemented in some time in the history of the repo with help of memoryjs but removed )
About the webassembly module injection, from the view you can upload a .wasm file and got compiled, then uploaded the binary (opcode) via message to the bot
The return can be checked in logs panel. There's an integrated lib inside the VM that exposes the following WinAPIs in case of windows payload:
ReadProcessMemory
WriteProcessMemory
VirtualProtectEx
VirtualAllocEx

![Alt text](/architecture-diagram.png?raw=true)

## Installation
From yarn manager
```bash
$ yarn install
```
Or from npm package manager
```bash
$ npm install
```
You need to import environment variables from .env 
```javascript
NODE_ENV = [production or development]
GOOGLE_MAPS_KEY = [avaiable at Google Cloud > API and Services > Credentials]
```
After importing your environment variables you should get the corresponding redis image:
We use REDIS as broker for persistance, in-memory cache and quick setup
```bash
$ docker run --name container-name -p 6379:6379 -d redis redis-server --appendonly yes
```
Is important for the docker instance to expose exactly the 6379 port, name it whatever you want

So now this should work only with yarn install without any other dependencies and cloud-free.

### Development setup
You'll need nodemon, if you have it installed this should work:

```bash
$ nodemon main dev
```
This will start the project over a development server that will hot reload on every source file change. If the change is in the wapp client it will not restart the message broker, if the change is over API, or main file this will restart the entire project, so be careful because ephemeral data will be destroyed.

### Production setup
For production instance, this will start the API which will connect to the Redis container, and build the nextjs project and serve it with the same framework making it available at
http://localhost:3000/

If you want to export the webapp client you could do
```bash
$ yarn export
```
This will create static files of the Progressive Web Application in out/ folder, then you can setup your hosting and this will connect to your local message broker every time. (Broken, host and port configuration not yet)

## Usage
After installing all the dependencies, if everything installed just fine, you could run 
```bash
$ node main
```



### Messaging structure
| Topic           | PublishOnMessage | Publish                                                                                  | Message                       |
|-----------------|------------------|------------------------------------------------------------------------------------------|-------------------------------|
| Admin/browsers  |                  | { headers: { status: '', nonce : '', clientId: ''}, body : { method : '', params: [] } } |                               |
| Bot/{client_id} |                  | { headers: { status: '', nonce: '', body: { method: '', params: [] } }                   | { status: '', telemetry: {} } |
| sonde           | connect          | { client_id : '' , log: '' }                                                             |                               |

#### Topic Bot/{client_id}
##### Methods
getTelemetry
```javascript
// Publish
{ method: 'getTelemetry'}
// Response (message)
{ status: 'A || B || C', telemetry: {}}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
## Live demo environment
Not available

