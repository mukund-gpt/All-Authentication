import React, { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


const EmailAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError("Email Already, Sign In")
      }
      else if (error.code === 'auth/missing-password') {
        setError("Enter the password")
      }
      else if (error.code === 'auth/invalid-email') {
        setError("Enter a valid Email")
      }
      else if (error.code === 'auth/network-request-failed') {
        setError("Network Error")
      }
      else {
        setError(error.message);
      }

    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        setError("Wrong Password")
      }
      else if (error.code === 'auth/missing-password') {
        setError("Enter the password")
      }
      else if (error.code === 'auth/invalid-email') {
        setError("Enter a valid Email")
      }
      else if (error.code === 'auth/network-request-failed') {
        setError("Network Error")
      }
      else {
        setError(error.message);
      }

    }
  };

  return (
    <div>
      <h2>Login With Email</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default EmailAuth;
