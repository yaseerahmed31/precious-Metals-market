import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCdXvco8ZXX_xZVHKDfcX-8MbgEBdj-kIc",
    authDomain: "precious-metals-market.firebaseapp.com",
    projectId: "precious-metals-market",
    storageBucket: "precious-metals-market.firebasestorage.app",
    messagingSenderId: "197723306598",
    appId: "1:197723306598:web:4903ca6fd24d5e40880ba7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
