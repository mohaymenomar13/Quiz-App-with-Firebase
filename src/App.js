import React, {useState} from 'react';
//import './App.css';

import MainPage from './MainPage';
import SignIn from './SignIn';
//import CreateQuiz from './pages/CreateQuiz';
//import NoPage from './NoPage';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

firebase.initializeApp({
  apiKey: "AIzaSyBFHkb35yfmYkCdsDVqViIjbTi6XCxczLE",
  authDomain: "ngick-quizapp.firebaseapp.com",
  projectId: "ngick-quizapp",
  storageBucket: "ngick-quizapp.appspot.com",
  messagingSenderId: "731028648256",
  appId: "1:731028648256:web:0e6d9b31841f3ee47e8aa5"
});

const auth = firebase.auth();

let i = 0;

function App() {
  i++;
  const [user] = useAuthState(auth);
  
  console.log(i +" "+ user);
  if (true) {
    return (
      <div >
        {true ? <MainPage /> : <SignIn />}
      </div>
      )
  } else {
    return (
      <div>
        <h1>Loading . . .</h1>
      </div>
    )
  }
}

/*
<Router>
  <Routes>
    <Route path="/" element={<SignIn user={user} />} />
    <Route path="/dashboard" Component={MainPage}/>
    <Route path="/create-quiz" Component={CreateQuiz} />
    <Route path="*" element={<NoPage />} />
  </Routes>
</Router>
*/

export default App;

