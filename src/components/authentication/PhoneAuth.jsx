// src/PhoneAuth.js
import React, { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { RecaptchaVerifier, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [error, setError] = useState(null);

  const setUpRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          console.log("Recaptcha verified");
        },
        'expired-callback': () => {
          console.log("Recaptcha expired");
        }
      });
    }
  };

  const sendVerificationCode = async () => {
    setUpRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(phoneNumber, appVerifier);
      setVerificationId(verificationId);
      alert("Verification code sent to your phone");
    } catch (error) {
        if(error.code==='auth/invalid-phone-number'){
            setError("Invalid Phone Number")
        }
        else if(error.code==='auth/network-request-failed'){
            setError("Network Error")
        }
        else{
            setError(error.message)
            console.error("Error during phone authentication", error);
        }
    }
  };

  const verifyCode = async () => {
    const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
    try {
      await signInWithCredential(auth, credential);
      alert("Phone number verified!");
    } catch (error) {
        if(error.code==='auth/invalid-verification-code'){
            setError("Invalid Verification Code")
        }
        else if(error.code==='auth/network-request-failed'){
            setError("Network Error")
        }
        else{
            console.error("Error verifying code", error);
            setError(error.message)
        }
      
    }
  };

  return (
    <div>
      <h3>Phone Authentication</h3>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="+911234567890"
        />
        <button onClick={sendVerificationCode}>Send Verification Code</button>
      </div>
      <div id="recaptcha-container"></div>
      {verificationId && (
        <div>
          <label>Verification Code:</label>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button onClick={verifyCode}>Verify Code</button>
            {error && <p>{error}</p>}

        </div>
      )}
    </div>
  );
};

export default PhoneAuth;
