// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCX-_P0S5I1tZyZuzm4ITxhfr8LqiErUNI",
  authDomain: "docverupload.firebaseapp.com",
  projectId: "docverupload",
  storageBucket: "docverupload.appspot.com",
  messagingSenderId: "918298841001",
  appId: "1:918298841001:web:484bfd60084f8e507efeb8",
  measurementId: "G-V87FLV1RBJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("fileInput");
  const status = document.getElementById("status");

  fileInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      status.textContent = "Processing PDF...";
      const arrayBuffer = await file.arrayBuffer();
      const pdfjsLib = window['pdfjs-dist/build/pdf'];

      // Load the PDF
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      let pdfText = "";

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(" ");
        pdfText += `Page ${pageNumber}: ${pageText}\n`;
      }

      // Store in Firebase Realtime Database
      const pdfRef = ref(database, "pdfContent");

      const newPostRef = push(pdfRef);

      set(newPostRef, { text: pdfText })
        .then(() => {
          status.textContent = "PDF text stored successfully in Firebase!";
        })
        .catch((error) => {
          console.error("Error storing data:", error);
          status.textContent = "Error storing data in Firebase.";
        });
    } else {
      status.textContent = "Please upload a valid PDF file.";
    }
  });
});

// Function: Save file metadata to Firestore
/*window.saveFileToFirestore = async function (fileInput) {
  if (!fileInput.files.length) {
    alert("No file selected!");
    return;
  }

  const file = fileInput.files[0];
  console.log("File selected:", file);

  if (!file) {
    alert("Error with file selection.");
    return;
  }

  try {
    console.log("Attempting to save file metadata...");
    const fileMetadata = {
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: serverTimestamp(),
    };

    console.log("Saving data to Firestore...");
    const response = await addDoc(collection(firestore, "files"), fileMetadata);

    console.log("Firestore response:", response);

    alert("File metadata saved to Firebase database!");
  } catch (error) {
    console.error("Error saving file metadata to Firestore:", error);
    alert("An error occurred while saving the file metadata.");
  }
}; 
*/
