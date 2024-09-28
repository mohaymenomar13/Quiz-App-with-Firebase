import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import DashBoard from './DashBoard';
import CreateQuiz from './CreateQuiz';
import StartQuiz from './StartQuiz';


firebase.initializeApp({
  apiKey: "AIzaSyBFHkb35yfmYkCdsDVqViIjbTi6XCxczLE",
  authDomain: "ngick-quizapp.firebaseapp.com",
  projectId: "ngick-quizapp",
  storageBucket: "ngick-quizapp.appspot.com",
  messagingSenderId: "731028648256",
  appId: "1:731028648256:web:0e6d9b31841f3ee47e8aa5"
});

function MainPage() {

  const [crteQuiz, setCrteQuiz] = useState(false);
  const [quizId , setQuizId] = useState(null);
  const [quizStart, setQuizStart] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState(null);
  const [quizTitle, setQuizTitle] = useState(null);
  
  if (quizQuestions !== null && quizStart !== false) {
    return (
      <StartQuiz quizQuestions={quizQuestions} quizTitle={quizTitle} />
    )
  } else {
    return (
      <div>
        {crteQuiz ? <CreateQuiz setCrteQuiz={setCrteQuiz} quizId={quizId} /> : <DashBoard setQuizTitle={setQuizTitle} setQuizQuestions={setQuizQuestions} setQuizStart={setQuizStart} setCrteQuiz={setCrteQuiz} setQuizId={setQuizId} />}
      </div>
    )
  }
}

export default MainPage;