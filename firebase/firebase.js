import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"
 const firebaseConfig = {
	apiKey: process.env.FIREBASE_APIKEY,
	authDomain: process.env.FIREBASE_AUTHDOMAIN,
	databaseURL: process.env.FIREBASE_DATABASEURL,
	projectId: process.env.FIREBASE_APPID,
	storageBucket: process.env.FIREBASE_STORAGEBUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
	appId: process.env.FIREBASE_APPID
};

try {
	firebase.initializeApp(firebaseConfig)
} catch(err) {
	if(!/already exists/.test(err.message)) {
		console.log('Firebase initialization error',err.stack)
	}
}
const db = firebase.database()
const auth = firebase.auth()

export { db, auth }
