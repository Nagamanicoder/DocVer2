document.addEventListener("DOMContentLoaded", function() {
  const fileInput = document.getElementById("fileInput");
  const output = document.getElementById("output");

  // Ensure the element exists before adding the event listener
  if (fileInput && output) {
    fileInput.addEventListener("change", async (event) => {
      const file = event.target.files[0];
      if (file && file.type === "application/pdf") {
        const arrayBuffer = await file.arrayBuffer();
        const pdfjsLib = window['pdfjs-dist/build/pdf'];

        // Load the PDF
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

        let pdfText = "";
        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
          const page = await pdf.getPage(pageNumber);
          const textContent = await page.getTextContent();

          // Extract text
          const pageText = textContent.items.map((item) => item.str).join(" ");
          pdfText += `Page ${pageNumber}:\n${pageText}\n\n`;
        }

        // Display the extracted text
        output.textContent = pdfText;
      } else {
        output.textContent = "Please select a valid PDF file.";
      }
    });
  }
});
