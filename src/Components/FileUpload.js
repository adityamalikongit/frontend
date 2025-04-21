// src/FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please choose a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // Upload preset from Cloudinary

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/video/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setProgress(percent);
          },
        }
      );

      // After the upload is complete, get the URL
      setDownloadURL(response.data.secure_url);
      console.log('File available at', response.data.secure_url);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {progress > 0 && <progress value={progress} max="100">{progress}%</progress>}
      {downloadURL && (
        <div>
          <p>Video uploaded! <a href={downloadURL} target="_blank" rel="noopener noreferrer">{downloadURL}</a></p>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
