// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { get } from "./user.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0WOTg7aiqnnTP4b7MssQ92tVfIX-_aus",
  authDomain: "recipe-30f46.firebaseapp.com",
  projectId: "recipe-30f46",
  storageBucket: "recipe-30f46.firebasestorage.app",
  messagingSenderId: "484818569902",
  appId: "1:484818569902:web:d694060e713565ebbabb3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const submit = document.getElementById('submit')


submit.addEventListener('click', (e) => {
  e.preventDefault()
  console.log(document.getElementById('email').value )
  let email = document.getElementById('email').value 
  let password = document.getElementById('password').value
  signInWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    // Signed in 
    const user = userCredential.user;
    let created = await get(email)
    if (created[1][email]){
      localStorage.setItem('login',email)
      window.location.href = 'main.html'
    }else{
      alert('Your account has not finished proccessing.')
    }

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error)
    alert(error)
  });
})

