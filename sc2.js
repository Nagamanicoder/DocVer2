    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
    import { getDatabase, ref, set, get, child  } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
   
    
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      const firebaseConfig1 = {
      apiKey: "AIzaSyAG_KoebKUvA1PtV61vv1z3rLTQwuAu2KI",
      authDomain: "docver-1516a.firebaseapp.com",
      projectId: "docver-1516a",
      storageBucket: "docver-1516a.firebasestorage.app",
      messagingSenderId: "467150797742",
      appId: "1:467150797742:web:9bf05d35bd7b444d7fe63f",
      measurementId: "G-BRTX634Y5G"
      };

    // Initialize Firebase
    const app1 = initializeApp(firebaseConfig1);
    
    //get ref to database services
    const db = getDatabase(app1);

    document.getElementById("Register").addEventListener('click',function(e){
      e.preventDefault();
      set(ref(db, 'user/' + document.getElementById("firstname").value),
      {
          firstname: document.getElementById("firstname").value,
          lastname: document.getElementById("lastname").value,
          phone: document.getElementById("phone").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,

         
    });     

      alert("SignUp SuccessFull :)");
   });