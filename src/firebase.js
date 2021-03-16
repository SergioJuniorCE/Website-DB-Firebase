import firebase from "firebase/app";
import "firebase/firestore";
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCnUawUGyptxRzZ8V5zYRFntXOc1aKETiQ",
  authDomain: "fir-8f325.firebaseapp.com",
  projectId: "fir-8f325",
  storageBucket: "fir-8f325.appspot.com",
  messagingSenderId: "1094511833288",
  appId: "1:1094511833288:web:d98095d1b3d8f4ea89f5fd",
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();
