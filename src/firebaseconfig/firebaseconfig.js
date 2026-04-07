import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCuaWhOYYioKiqGgy88dUVJrHgzmk1kBos",
  authDomain: "abbrv-17faa.firebaseapp.com",
  projectId: "abbrv-17faa",
  storageBucket: "abbrv-17faa.appspot.com",
  messagingSenderId: "20364186169",
  appId: "1:20364186169:web:ddd253cd1dde3faf5cb3e8",
});

export const auth = app.auth();
export const fstore = app.firestore();
export default app;
