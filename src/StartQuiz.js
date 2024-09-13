import React, { useState, useEffect } from 'react';
import './StartQuiz.css';

function StartQuiz(props) {
    const questions = [props.quizQuestions];

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const shuffledQuestions =  shuffleArray(questions[0])

    console.log(shuffledQuestions)

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(shuffledQuestions[currentQuestionIndex]);
    const [answerInput, setAnswerInput] = useState('');
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [timeConsumed, setTimeConsumed] = useState(0);

    useEffect(() => {
        setCurrentQuestion(shuffledQuestions[currentQuestionIndex]);
        setAnswerInput('');
    }, [currentQuestionIndex, shuffledQuestions]);

    const handleSubmit = () => {
        if (answerInput.toLowerCase() === currentQuestion.answer.toLowerCase()) {
            setCorrectAnswers(correctAnswers + 1);
        } else {
            setMistakes(mistakes + 1);
        }

        if (currentQuestionIndex < shuffledQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            alert("Finshed!");
        }
    };

    const handleAnswerInputChange = (event) => {
        setAnswerInput(event.target.value);
    };

    return (
        <div className="sq-main-content">
            <h1 style={{fontSize: "2rem", fontWeight:"bold", marginBottom:"32px"}}>Test7</h1>
            <div className="sq-quiz-container">
                <div className="sq-question-card">
                    <div className="sq-question">
                        <p id="sq-question-text">{currentQuestion.question}</p>
                    </div> 
                    <input type="text" placeholder="Your answer..." className="sq-input-field" id="answerInput" value={answerInput} onChange={handleAnswerInputChange}/>
                    <button id="submitBtn" className="sq-submit-btn" onClick={handleSubmit}>Submit</button>
                    <div className="sq-progress-bar-container">
                        <div className="sq-progress-bar" id="progressBar" style={{width: `${(currentQuestionIndex / shuffledQuestions.length) * 100}%`}}></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
                        <p style={{ fontSize: "0.875rem" }}>Question <span id="currentQuestionIndex">{currentQuestionIndex + 1}</span></p>
                        <p style={{ fontSize: "0.875rem" }}>Time Consumed: <span id="timeConsumed" style={{fontWeight:"bold"}}>{timeConsumed}</span></p>
                    </div>
                    <div style={{ marginTop: -15, display: 'flex', justifyContent: 'space-between' }}>
                        <p style={{ fontSize: "0.875rem" }}>Correct: <span id="correctAnswers">{correctAnswers}</span></p>
                        <p style={{ fontSize: "0.875rem" }}>Mistakes: <span id="mistakes">{mistakes}</span></p>
                    </div>
                    <button id="saveBtn" className="sq-save-btn">Exit</button>
                </div>
            </div>
        </div>
    );
}

export default StartQuiz;