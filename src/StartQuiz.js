import React, { useState, useEffect, useRef } from 'react';

function StartQuiz(props) {

    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const [questions, setQuestions] = useState([]);
    const [mistakenQuestions, setMistakenQuestions] = useState([]); 
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [answerInput, setAnswerInput] = useState('');
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [timeConsumed, setTimeConsumed] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const answerInputRef = useRef(null);

    useEffect(() => {
        const shuffledQuestions = shuffleArray(props.quizQuestions);
        setQuestions(shuffledQuestions);
        setCurrentQuestion(shuffledQuestions[0]);
    }, [props.quizQuestions]);

    useEffect(() => {
        if (quizFinished) return;

        const timer = setInterval(() => {
            setTimeConsumed((prevTime) => prevTime + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [quizFinished]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (answerInput.toLowerCase().replaceAll("s", "").replaceAll("e","").replaceAll(" ", "").replaceAll("-", "") === currentQuestion.answer.toLowerCase().replaceAll("s", "").replaceAll("e","").replaceAll(" ", "").replaceAll("-", "")) {
            setCorrectAnswers(correctAnswers + 1);
        } else {
            setMistakenQuestions([...mistakenQuestions, {question: currentQuestion.question, userAnswer: answerInput, answer: currentQuestion.answer}]);
            setMistakes(mistakes + 1);
            //console.log(currentQuestion.question + " " + currentQuestion.answer + " " + answerInput);
        }

        if (currentQuestionIndex < questions.length - 1) {
            const nextIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextIndex);
            setCurrentQuestion(questions[nextIndex]);
            setAnswerInput('');
        } else {
            setQuizFinished(true);
            alert("Finished!");
        }

        if (answerInputRef.current) {
            answerInputRef.current.focus();
        }
    };
    return (
        <div>
            {quizFinished ? (
                <div className="sq-mistaken-questions-container">
                    <h2>Your Mistaken Questions</h2>
                    <p>Score: {questions.length-mistakes}/{questions.length}</p>
                    <p>Percentage: {Math.floor(((questions.length-mistakes)/questions.length)*100)}%</p>
                    <p>Time Consumed: {formatTime(timeConsumed)}</p>
                    {mistakenQuestions.length > 0 ? (
                        mistakenQuestions.map((mistake, index) => (
                            <div key={index} className="mistaken-question-card">
                                <p dangerouslySetInnerHTML={{ __html: mistake.question }}><strong>Question:</strong></p>
                                <p><strong>Your Answer:</strong> {mistake.userAnswer}</p>
                                <p><strong>Correct Answer:</strong> {mistake.answer}</p>
                            </div>
                        ))
                    ) : (
                        <p>No mistakes! Well done!</p>
                    )}
                </div>
                ) 
                : 
                (
                <div className="sq-main-content">
                    <h1 style={{fontSize: "2rem", fontWeight:"bold", marginBottom:"32px"}}>{props.quizTitle}</h1>
                    <div className="sq-quiz-container">
                        <div className="sq-question-card">
                            <form onSubmit={handleSubmit}>
                                <div className="sq-question">
                                    <p id="sq-question-text" dangerouslySetInnerHTML={{ __html: currentQuestion.question }}></p>
                                </div> 
                                <input 
                                    type="text" 
                                    placeholder="Your answer..." 
                                    className="sq-input-field" 
                                    id="answerInput" 
                                    value={answerInput} 
                                    onChange={(e) => setAnswerInput(e.target.value)}
                                    ref={answerInputRef}
                                />
                                <button 
                                    id="submitBtn" 
                                    className="sq-submit-btn" 
                                    disabled={quizFinished}
                                >
                                Submit
                                </button>
                            </form>
                            <div className="sq-progress-bar-container">
                                <div 
                                    className="sq-progress-bar" 
                                    id="progressBar" 
                                    style={{width: `${((currentQuestionIndex+1) / questions.length) * 100}%`}}
                                ></div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
                                <p style={{ fontSize: "0.875rem" }}>Question: <span id="currentQuestionIndex">{currentQuestionIndex + 1}/{questions.length}</span></p>
                                <p style={{ fontSize: "0.875rem" }}>Time Consumed: <span id="timeConsumed" style={{fontWeight:"bold"}}>{formatTime(timeConsumed)}</span></p>
                            </div>
                            <div style={{ marginTop: -15, display: 'flex', justifyContent: 'space-between' }}>
                                <p style={{ fontSize: "0.875rem" }}>Correct: <span id="correctAnswers">{correctAnswers}</span></p>
                                <p style={{ fontSize: "0.875rem" }}>Mistakes: <span id="mistakes">{mistakes}</span></p>
                            </div>
                            <button id="saveBtn" className="sq-save-btn">Exit</button>
                        </div>
                    </div>
                </div>
                )}
        </div>
    )
}

export default StartQuiz;
