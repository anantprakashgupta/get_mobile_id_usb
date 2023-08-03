const fs = require('fs');
const fingerprint = require('node-fingerprint');

// Configure the biometrics device connection here
const deviceConfig = {
  port: 'COM3', // Replace with your actual port name (Windows) or '/dev/ttyUSB0' (Linux)
  baudRate: 9600, // Replace with the appropriate baud rate
};

// Initialize the fingerprint reader
const reader = new fingerprint.FingerprintReader(deviceConfig);

// Function to fetch and save finger image
function fetchAndSaveFingerImage() {
  reader.connect((err) => {
    if (err) {
      console.error('Error connecting to the fingerprint reader:', err);
      return;
    }

    console.log('Connected to the fingerprint reader');

    // Capture the finger image
    reader.capture((captureErr, imageBuffer) => {
      if (captureErr) {
        console.error('Error capturing the finger image:', captureErr);
        reader.disconnect(); // Close the connection
        return;
      }

      const imageName = `finger_image_${new Date().toISOString()}.bmp`;
      const imagePath = `finger_images/${imageName}`;

      // Save the captured finger image to a folder
      fs.writeFile(imagePath, imageBuffer, (writeErr) => {
        if (writeErr) {
          console.error('Error saving the finger image:', writeErr);
        } else {
          console.log(`Finger image saved as ${imageName}`);
        }
        reader.disconnect(); // Close the connection
      });
    });
  });
}

// Call the function to fetch and save the finger image
fetchAndSaveFingerImage();
