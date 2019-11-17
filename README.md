# Hangoutmybrowser
![Alt text](/crash.png?raw=true)

Hangoutmybrowser is a demo for mqtt architecture based botnet aiming to browser and IoT targets.
In dev process, nor the architecture and the main functionality are available
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

## Usage
Build the next project
```bash
$ yarn build 
```
Start in prod mode
```bash
$ yarn start
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
## Live demo environment
[hangoutmybrowser-5nt099km8.now.sh]
