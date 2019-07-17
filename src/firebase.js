import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyDZpVVmh6M0yKqY-vH8hGl47lsvDCtBeTU",
	authDomain: "vue-druc.firebaseapp.com",
	databaseURL: "https://vue-druc.firebaseio.com",
	projectId: "vue-druc",
	storageBucket: "vue-druc.appspot.com",
	messagingSenderId: "115182039616",
	appId: "1:115182039616:web:e7187bc0ecc238bc"
  };

  firebase.initializeApp(firebaseConfig);


  export default { firebase };