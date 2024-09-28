import React, { useState, useCallback, useEffect } from 'react';
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

function CreateQuiz(props) {

  const user = auth.currentUser;

  const [questions, setQuestions] = useState([]);

  const fetchQuizzes = useCallback(async () => {
    if (props.quizId !== null) {
      const fetchQuiz = db.collection('quizzes').doc(user.uid).collection('userQuizzes').doc(props.quizId);
      const snapshot = await fetchQuiz.get();
      const quizData = snapshot.data();
      setQuizTitle(quizData.title);
      setQuestions(quizData.questions);
    }
  }, [user.uid, props.quizId]);

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editQuestion, setEditQuestion] = useState('');
  const [editAnswer, setEditAnswer] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false); 
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [quizTitle, setQuizTitle] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);


  const addQuestion = async (e) => {
    e.preventDefault();

    if (!question || !answer) {
      alert('Please fill in both question and answer fields.');
      return;
    }

    setQuestions([...questions, { question, answer }]);
    setQuestion('');
    setAnswer('');
  };

  const openDialog = () => {
    setShowExitDialog(false);
    if (questions.length === 0) {
      alert('Please add at least one question before saving the quiz.');
      return;
    }
    setShowDialog(true);
  };

  const saveQuiz = async () => {
    const user = auth.currentUser;
    const quizRef = db.collection('quizzes').doc(user.uid).collection('userQuizzes').doc();

    await quizRef.set({
      title: quizTitle,
      questions,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    if (props.quizId !== null) {
      await db.collection('quizzes').doc(user.uid).collection('userQuizzes').doc(props.quizId).delete();
    }
    setShowDialog(false);
    window.location.href = '';
  };

  const handleExit = () => {
    if (questions.length !== 0) {
      setShowExitDialog(true);
    } else {
      props.setCrteQuiz(false);
    }
  };

  const exitWithoutSaving = () => {
    props.setCrteQuiz(false);
    setQuestions([]);
    setShowExitDialog(false);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditQuestion(questions[index].question);
    setEditAnswer(questions[index].answer);
    setShowEditDialog(true);
  };

  const saveEdit = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[editIndex] = { question: editQuestion, answer: editAnswer };
    setQuestions(updatedQuestions);
    setShowEditDialog(false);
    setEditQuestion('');
    setEditAnswer('');
  };

  const openDeleteDialog = (index) => {
    setDeleteIndex(index);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    const updatedQuestions = questions.filter((_, i) => i !== deleteIndex);
    setQuestions(updatedQuestions);
    setDeleteDialogOpen(false);
  };

  return (<div className="createquiz-container">
    <div className='exit-button-div'>
      <button className="createquiz-exit-button" onClick={handleExit}>Exit</button>
    </div>
    <h1 className="createquiz-title" >Add New Quiz Question</h1>
    <form className="mb-4" onSubmit={addQuestion}>
      <div className="createquiz-form-group">
        <label htmlFor="answer" className="createquiz-form-label">Answer Key</label>
        <input
          type="text"
          id="answer"
          name="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter the correct answer"
          className="createquiz-form-input"
        />
      </div>
      <div className="createquiz-form-group">
        <label htmlFor="question" className="createquiz-form-label">Question</label>
        <input
          type="text"
          id="question"
          name="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question"
          className="createquiz-form-input"
        />
      </div>
      <div className="div-dialog">
        <button type="submit" className="createquiz-form-button">Add Question</button>
      </div>
    </form>

    <div className="question-list">
      <h2 className="text-lg font-semibold mb-2">Questions & Answers</h2>
      <ul id="createquiz-question-list">
        {questions.map((q, index) => (
          <li key={index} className="question-item">
            <div>
              <p className="question-text">{q.question}</p>
              <p className="answer-text">Answer: {q.answer}</p>
            </div>
            <div className="action-buttons">
              {/* Edit and Delete buttons can be implemented later */}
              <button className="action-button" onClick={() => handleEdit(index)}>Edit</button>
              <button className="action-button delete-button" onClick={() => openDeleteDialog(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>

    <div className="button-group">
      <button className="createquiz-save-button" onClick={openDialog}>Save Quiz</button>
    </div>

    {showDialog && (
      <div className="dialog-overlay">
        <div className="dialog-content">
          <h2 className="dialog-title">Save Quiz</h2>
          <label className="dialog-label">Quiz Title:</label>
          <input
            type="text"
            className="dialog-input"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            placeholder="Enter quiz title"
          />
          <div className="dialog-buttons">
            <button className="dialog-save-button" onClick={saveQuiz}>Save</button>
            <button className="dialog-cancel-button" onClick={() => setShowDialog(false)}>Cancel</button>
          </div>
        </div>
      </div>
    )}

    {showExitDialog && (
      <div className="dialog-overlay">
        <div className="dialog-content">
          <h2 className="dialog-title">Exit Quiz</h2>
          <p>Do you want to save your progress before exiting?</p>
          <div className="dialog-buttons">
            <button className="dialog-save-button" onClick={openDialog}>Save</button>
            <button className="dialog-exit-button" onClick={exitWithoutSaving}>Exit Without Saving</button>
            <button className="dialog-cancel-button" onClick={() => setShowExitDialog(false)}>Cancel</button>
          </div>
        </div>
      </div>
    )}

    {showEditDialog && (
      <div className="dialog-overlay">
        <div className="dialog-content">
          <h2 className="dialog-title">Edit Question</h2>
          <label className="dialog-label">Answer:</label>
          <input
            type="text"
            className="dialog-input"
            value={editAnswer}
            onChange={(e) => setEditAnswer(e.target.value)}
          />
          <label className="dialog-label">Question:</label>
          <input
            type="text"
            className="dialog-input"
            value={editQuestion}
            onChange={(e) => setEditQuestion(e.target.value)}
          />
          <div className='div-dialog'>
            <div className="dialog-buttons-1">
              <button className="dialog-save-button" onClick={saveEdit}>Save</button>
              <button className="dialog-cancel-button" onClick={() => setShowEditDialog(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )}

    {deleteDialogOpen && (
      <div className="dialog-overlay">
        <div className="dialog-content">
          <h2 className="dialog-title">Confirm Delete</h2>
          <p>Are you sure you want to delete this question?</p>
          <div className='div-dialog'> 
            <div className="dialog-buttons-1">
              <button className="dialog-delete-button" onClick={confirmDelete}>Delete</button>
              <button onClick={() => setDeleteDialogOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>);
}

export default CreateQuiz;