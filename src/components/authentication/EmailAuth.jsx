import React, { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


const EmailAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth,email, password);
    } catch (error) {
        if(error.code==='auth/email-already-in-use'){
            setError("Email Already, Sign In")
        }
        else{
            setError(error.message);
        }
      
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth,email, password);
    } catch (error) {
        if(error.code==='auth/invalid-credential'){
            setError("Wrong Password")
        }
        else{
            setError(error.message);
        }
      
    }
  };

  return (
    <div>
      <h2>Email/Password Authentication</h2>
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
