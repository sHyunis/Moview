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

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3OuNZBprr2iRYKTB6C83s4ciXXOTDROA",
  authDomain: "sparta-movie-project.firebaseapp.com",
  projectId: "sparta-movie-project",
  storageBucket: "sparta-movie-project.appspot.com",
  messagingSenderId: "29347735133",
  appId: "1:29347735133:web:19ff5afb5e7e61d4644fb4"
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db, collection, addDoc, getDocs, doc, query, where };