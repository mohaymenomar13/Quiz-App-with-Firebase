import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import './SignIn.css';
import googleLogo from './google-logo.png';
import appLogo from './quiz-app-logo.png';

firebase.initializeApp({
  apiKey: "AIzaSyBFHkb35yfmYkCdsDVqViIjbTi6XCxczLE",
  authDomain: "ngick-quizapp.firebaseapp.com",
  projectId: "ngick-quizapp",
  storageBucket: "ngick-quizapp.appspot.com",
  messagingSenderId: "731028648256",
  appId: "1:731028648256:web:0e6d9b31841f3ee47e8aa5"
});

const auth = firebase.auth(); 

function SignIn() {
  const useSignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <div className='App'>
      <header>
      <img style={{width: "100px"}} src={appLogo} alt="App Logo" />
        <h1>Quiz App</h1>
        <p>Challenge your knowledge, track your progress.</p>
      </header>

      <main>
        <button onClick={useSignInWithGoogle}>
          <img style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)', borderRadius: "50px" }} src={googleLogo} alt="Google Icon" />
          <span>Sign in with Google</span>
        </button>
      </main>

      <footer>
        <a href="#">Privacy Policy</a>
        <span>|</span>
        <a href="#">Terms of Service</a>
      </footer>
    </div>
  )
}
  
export default SignIn;