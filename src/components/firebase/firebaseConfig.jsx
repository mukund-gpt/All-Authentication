import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCMVBYEFCELJjnsBDyR5gLO8kgD3ixdLdk",
  authDomain: "all--authentication.firebaseapp.com",
  projectId: "all--authentication",
  storageBucket: "all--authentication.appspot.com",
  messagingSenderId: "754054311152",
  appId: "1:754054311152:web:3ed15f6843932797772635",
  measurementId: "G-84LLKPY2EJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
