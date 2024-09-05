// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyATTQxAdeUBc-Em0eGCU2BO2ZMVwK9SIVg",

  authDomain: "chat-app-c67a4.firebaseapp.com",

  projectId: "chat-app-c67a4",

  storageBucket: "chat-app-c67a4.appspot.com",

  messagingSenderId: "310934644873",

  appId: "1:310934644873:web:ce8ecaf6c773653c56fe58",

  measurementId: "G-NN80WS1E76"

};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);
