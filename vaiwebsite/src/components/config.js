// Import the specific Firebase modules you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAwMqAQN9kJ2mSGO7z4HSSL7Bo-JA_wDyc",
    authDomain: "aiwebsite-b796a.firebaseapp.com",
    projectId: "aiwebsite-b796a",
    storageBucket: "aiwebsite-b796a.appspot.com",
    messagingSenderId: "783158039112",
    appId: "1:783158039112:web:23dfc95ee0c38a61d1fe7d"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get the storage service
const storage = firebase.storage();

// Export the storage service
export { storage };
