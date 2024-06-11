import React, { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import EmailAuth from './EmailAuth';
import PhoneAuth from './PhoneAuth';
import '@dotlottie/player-component';
import './auth.css'

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
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        setError('An account with this email already exists. Please sign in using the appropriate provider.');
      } else {
        console.error('An error occurred while signing in with Facebook:', error);
      }
    }
  };

  const signInWithGitHub = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("GitHub sign-in error", error);
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
          <EmailAuth />
          <PhoneAuth />
          <div className="gfg">
            <button onClick={signInWithGoogle}>

              <dotlottie-player src="https://lottie.host/f00a74c5-a2f9-4265-9ba4-7ec5f6f47810/hpv03wQUWZ.json" background="transparent" speed="1" style={{ width: '100px', height: '100px' }} loop autoplay></dotlottie-player>

              Sign in with Google</button>
            <button onClick={signInWithFacebook}>

              <dotlottie-player src="https://lottie.host/b5c5e228-885e-4b4d-bb65-39c914216c51/KePYB7wgia.json" background="transparent" speed="1" style={{ width: '100px', height: '100px' }} loop autoplay></dotlottie-player>

              Sign in with Facebook</button>
            <button onClick={signInWithGitHub}>
              <dotlottie-player src="https://lottie.host/14021380-9df9-44b0-8bf5-c7e072baeb14/QSqxryMV78.json" background="transparent" speed="1" style={{ width: '100px', height: '100px' }} loop autoplay></dotlottie-player>
              Sign in with GitHub</button>
          </div>



          {error && <p>{error}</p>}

        </div>
      )}
    </div>
  );
};

export default Auth;
