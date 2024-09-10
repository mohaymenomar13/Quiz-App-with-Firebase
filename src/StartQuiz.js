import React, { useState, useEffect } from 'react';
import './StartQuiz.css';

const quizQuestions = {
  paris: 'What is the capital of France?',
  mars: 'Which planet is known as the Red Planet?',
};

function StartQuiz() {
    return (
        <div class="main-content">
        <h1 style={{""}}>[Title Quiz]</h1>
        <div class="quiz-container">
            <div class="question-card">
                <div class="question">
                    <p id="question-text">Question Description</p>
                </div>
                <input type="text" placeholder="Your answer..." class="input-field" id="answerInput"/>
                <button id="submitBtn" class="submit-btn">Submit</button>
                <div class="progress-bar-container">
                    <div class="progress-bar" id="progressBar"></div>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 16px;">
                    <p style="font-size: 0.875rem;">Question <span id="currentQuestionIndex">1</span></p>
                    <p style="font-size: 0.875rem;">Time Consumed: <span id="timeConsumed" style="font-weight: bold;">00:00</span></p>
                </div>
                <div style="margin-top: -15px; display: flex; justify-content: space-between;">
                    <p style="font-size: 0.875rem;">Correct: <span id="correctAnswers">0</span></p>
                    <p style="font-size: 0.875rem;">Mistakes: <span id="mistakes">0</span></p>
                </div>
                <button id="saveBtn" class="save-btn">Save and Exit</button>
            </div>
        </div>
    </div>

    );
}

export default StartQuiz;
