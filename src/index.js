import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase/app";


firebase.initializeApp({
	apiKey: "AIzaSyBYiqbE7tORqMOgd0SP9v9MLLMrJG33JLg",
	authDomain: "wheres-waldo-6c2a0.firebaseapp.com",
	projectId: "wheres-waldo-6c2a0",
	storageBucket: "wheres-waldo-6c2a0.appspot.com",
	messagingSenderId: "1076355121632",
	appId: "1:1076355121632:web:347998d46f752d27c1eb85",
	measurementId: "G-HDVEXKCKE8"
});


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
