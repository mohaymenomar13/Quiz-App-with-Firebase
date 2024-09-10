import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import DashBoard from './DashBoard';
import CreateQuiz from './CreateQuiz';
import "./DashBoard.css";
import './CreateQuiz.css';

firebase.initializeApp({
  apiKey: "AIzaSyBFHkb35yfmYkCdsDVqViIjbTi6XCxczLE",
  authDomain: "ngick-quizapp.firebaseapp.com",
  projectId: "ngick-quizapp",
  storageBucket: "ngick-quizapp.appspot.com",
  messagingSenderId: "731028648256",
  appId: "1:731028648256:web:0e6d9b31841f3ee47e8aa5"
});

const auth = firebase.auth(); 
const db = firebase.firestore();

let i = 0;

function MainPage() {
  i++;

  const [crteQuiz, setCrteQuiz] = useState(false);
  console.log(crteQuiz);

  if (i >= 2) {
    return (
      <div>
        {crteQuiz ? <CreateQuiz setCrteQuiz={setCrteQuiz} /> : <DashBoard setCrteQuiz={setCrteQuiz} />}
      </div>
    )
  } else {
    return (
      <div>
        <h1>Loading . . .</h1>
      </div>
    );
  };
}

export default MainPage;