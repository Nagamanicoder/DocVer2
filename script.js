// Function to validate uploaded file
function validateUploadedFile(file) {
    const MAX_SIZE = 20 * 1024 * 1024 ; // 20MB in bytes
    const ALLOWED_FORMAT = "application/pdf";

    // Check file type
    if (file.type !== ALLOWED_FORMAT) {
        return {
            isValid: false,
            message: "Invalid file format. Only PDF files are allowed."
        };
    }

    // Check file size
    if (file.size > MAX_SIZE) {
        return {
            isValid: false,
            message: "File size exceeds the 20MB limit."
        };
    }

    return {
        isValid: true,
        message: "File is valid."
    };
}

// Example usage
document.getElementById('fileInput').addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const validation = validateUploadedFile(file);

        if (!validation.isValid) {
            alert(validation.message);
        } else {
            alert("File Uploaded and Verified successfully!");
        }
    } else {
        alert("No file selected.");
    }
});
