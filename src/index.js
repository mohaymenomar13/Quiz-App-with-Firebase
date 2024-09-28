import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//import Test from './test';
import reportWebVitals from './reportWebVitals';

import './index.css';
import "./DashBoard.css";
import './CreateQuiz.css';
import './SignIn.css';
import './StartQuiz.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <App />
    //<Test />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
