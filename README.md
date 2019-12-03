# MQBot
![Alt text](/crash.png?raw=true)

MQBot is a demo for mqtt architecture based botnet aiming to browser and IoT targets. In dev process, either the architecture nor the main functionality are available
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
FIREBASE_APIKEY = [Random chr and int]
FIREBASE_AUTHDOMAIN = your-domain.firebaseapp.com
FIREBASE_DATABASEURL = https://your-database-entrypoint.firebaseio.com
FIREBASE_PROJECTID = your-domain
FIREBASE_STORAGEBUCKET = "your-bucket"
FIREBASE_MESSAGINGSENDERID = 0000000000000
FIREBASE_APPID = 0:0000000000000:web:0000aaa00000a0a0
GOOGLE_MAPS_KEY = [avaiable at Google Cloud > API and Services > Credentials]
```
After importing your environment variables you should get the corresponding redis image:
We use REDIS as broker for persistance, in-memory cache and quick setup
```bash
$ docker run --name container-name -p 6379:6379 -d redis redis-server --appendonly yes
```
Is important for the docker instance to expose exactly the 6379 port, name it whatever you want

## Usage
After installing all the dependencies, if everything installed just fine, you could run 
```bash
$ node main
```
For production instance, this will start the API which will connect to the Redis container, and build the nextjs project and serve it with the same framework making it available at
http://localhost:3000/

If you want to export the webapp client you could do
```bash
$ yarn export
```
This will create static files of the Progressive Web Application in out/ folder, then you can setup your hosting and this will connect to your local message broker every time. (Broken, host and port configuration not yet)

### Development setup
You'll need nodemon, if you have it installed this should work:
$ nodemon main dev

This will start the project over a development server that will hot reload on every source file change. If the change is in the wapp client it will not restart the message broker, if the change is over API, or main file this will restart the entire project, so be careful because ephemeral data will be destroyed.


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
## Live demo environment
Not available

