// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import {
  collection,
  addDoc,
  doc,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9DrCeOJe4mB_suJXCxT0y_32w5eXNFP4",
  authDomain: "sparata-project-movie.firebaseapp.com",
  projectId: "sparata-project-movie",
  storageBucket: "sparata-project-movie.appspot.com",
  messagingSenderId: "567087462979",
  appId: "1:567087462979:web:85904c34cb1c030c3c72f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db, collection, addDoc, getDocs, doc, query, where };