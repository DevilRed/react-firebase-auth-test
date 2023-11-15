import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCOKEXgbF1TIgFejhzys8dT5tHNw-9iQNs",
    authDomain: "react-auth-challenge.firebaseapp.com",
    projectId: "eact-auth-challenge",
    storageBucket: "react-auth-challenge.appspot.com",
    messagingSenderId: "949198278713",
    appId: "1:949198278713:web:37398affe131d6d3dcfde8"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }