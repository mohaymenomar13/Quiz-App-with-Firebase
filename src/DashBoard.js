import React, { useState, useEffect, useCallback } from 'react';
import Popup from 'reactjs-popup';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

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

function DashBoard(props) {
    
    const handleCreateQuiz = () => {
      props.setCrteQuiz(true)
    };

    const [quizzes, setQuizzes] = useState([]);

    const user = auth.currentUser;

    const fetchQuizzes = useCallback(async () => {
    if (user) {
        const quizRef = db.collection('quizzes').doc(user.uid).collection('userQuizzes');
        const snapshot = await quizRef.orderBy('createdAt', 'desc').get();
        const quizData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setQuizzes(quizData);
    }
    }, [user]);

    useEffect(() => {
      fetchQuizzes();
    }, [fetchQuizzes]);
    
      const logout = () => {
        auth.signOut();
        window.location.href = '/';
      }
    
    return (
            <div className="container">
              <header className="header">
                <div className='user-info'>
                  <img src={user?.photoURL} alt="User Avatar" className="user-avatar" />
                  <span className="greeting">Hello, {user?.displayName}</span>
                </div>
                <h1 className="title">My Quizzes</h1>
                <div className="user-btn">
                  <button onClick={handleCreateQuiz} style={{ marginRight: "10px" }} className="createBtn">
                    <span id="createBtnTxt">Create Quiz</span>
                  </button>
                  <button className="logout-button" onClick={logout}>Logout</button>
                </div>
              </header>
              <div className="quiz-grid">
                {quizzes.map((quiz) => (
                  <div key={quiz.id} className="quiz-card" id={quiz.id}>
                    <h2 className="quiz-title">{quiz.title}</h2>
                    <p className="quiz-description">Created at: {quiz.createdAt?.toDate().toLocaleString()}</p>
                    <div className="button-group">
                      <button className="start-button">Start Quiz</button>
                      <button className="review-button">Review / Edit</button>
                      <DeleteDialog quizId={quiz.id} />
                    </div>
                  </div>
                ))}
              </div>
          </div>
        );
}

function DeleteDialog({ quizId }) {
    const user = auth.currentUser;
  
    const handleProceedDelete = useCallback(async () => {
        if (user) {
          await db.collection('quizzes').doc(user.uid).collection('userQuizzes').doc(quizId).delete();
          document.getElementById(quizId).style.display = 'none';
        }
    }, [user, quizId]);
  
    return (
      <Popup trigger={<button className="delete-button">Delete</button>}>
        {close => (
          <div id="deleteDialog" onClick={() => close()}>
            <div id="deleteDialog-content">
              <h2>Delete Quiz?</h2>
              <p>Are you sure you want to delete it?</p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button id="confirmDeleteBtn" onClick={handleProceedDelete}>Yes</button>
                <button onClick={() => close()}>No</button>
              </div>
            </div>
          </div>
        )}
      </Popup>
    );
  }

export default DashBoard;