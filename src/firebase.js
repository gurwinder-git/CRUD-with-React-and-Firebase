import firebase from 'firebase'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "xxxxxxxxxxxxxxxx",
    authDomain: "xxxxxxxxxxxxxxxxx",
    databaseURL: "xxxxxxxxxxxxxxxxxxx",
    projectId: "xxxxxxxxxxxxxx",
    storageBucket: "xxxxxxxxxxxxxxx",
    messagingSenderId: "xxxxxxxxxxxxxxxx",
    appId: "1:xxxxxxxxxxxxxxxxxxxx"
  };
  // Initialize Firebase
  let fireDb = firebase.initializeApp(firebaseConfig);

  export default fireDb.database().ref();