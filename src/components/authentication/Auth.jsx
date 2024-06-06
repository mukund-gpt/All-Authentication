import React, { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';


const Auth = () => {
  const [user] = useAuthState(auth);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google sign-in error", error);
    }
  };

  const [error, setError] = useState(null);
  const signInWithFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider(); 
      await signInWithPopup(auth,provider);
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        setError('An account with this email already exists. Please sign in using the appropriate provider.');
      } else {
        console.error('An error occurred while signing in with Facebook:', error);
      }
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Sign-out error", error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          {/* {console.log(user)} */}
          <h1>Welcome, {user.displayName}</h1>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <button onClick={signInWithGoogle}>Sign in with Google</button>
          <button onClick={signInWithFacebook}>Sign in with Facebook</button>
          {error && <p>{error}</p>}
          
        </div>
      )}
    </div>
  );
};

export default Auth;
