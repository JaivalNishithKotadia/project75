import firebase from 'firebase';

require("@firebase/firestore")

const firebaseConfig = {
   apiKey: "AIzaSyBrahGrFOZ7MWDBMq5EdZjC0tUahxFIr2A",
  authDomain: "storyhub-e821f.firebaseapp.com",
  databaseURL: "https://storyhub-e821f-default-rtdb.firebaseio.com",
  projectId: "storyhub-e821f",
  storageBucket: "storyhub-e821f.appspot.com",
  messagingSenderId: "154026824078",
  appId: "1:154026824078:web:2ee79029ba1731282714df"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();