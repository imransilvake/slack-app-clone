// app
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// initialize firebase
const config = {
	apiKey: 'AIzaSyA1ze2cNKZjCFvdNFdapL29yScs2WQqcfk',
	authDomain: 'slack-app-clone.firebaseapp.com',
	databaseURL: 'https://slack-app-clone.firebaseio.com',
	projectId: 'slack-app-clone',
	storageBucket: 'slack-app-clone.appspot.com',
	messagingSenderId: '756633407368'
};
firebase.initializeApp(config);

export default firebase;
