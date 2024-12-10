// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

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
// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("pdfFileInput");
  const status = document.getElementById("uploadStatus");

  fileInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    
    // Ensure it's a PDF
    if (file && file.type === "application/pdf") {
      status.textContent = "Processing PDF...";

      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfjsLib = window['pdfjs-dist/build/pdf'];

        // Load the PDF document
        const pdfDocument = await pdfjsLib.getDocument(arrayBuffer).promise;
        let extractedText = "";

        // Extract text from each page of the PDF
        for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber++) {
          const page = await pdfDocument.getPage(pageNumber);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str).join(" ");
          extractedText += `Page ${pageNumber}: ${pageText}\n`;
        }

        // Create a database reference under "uploadedPDFs" with unique key
        const databaseRef = ref(database, "uploadedPDFs");

        // Store data using push() to avoid overwriting
        await push(databaseRef, {
          fileName: file.name,
          content: extractedText,
          uploadedAt: Date.now()
        });

        status.textContent = "PDF uploaded and data stored successfully!";
      } catch (error) {
        console.error("Error processing or uploading data: ", error);
        status.textContent = "Error processing or uploading data.";
      }
    } else {
      status.textContent = "Please upload a valid PDF file.";
    }
  });
});
