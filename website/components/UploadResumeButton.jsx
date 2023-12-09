import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '300px', // Set the desired width
  },
};

export default function UploadResumeButton() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Check if a file is selected and it is a PDF
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setResponseText('');
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      setUploading(true);

      // Upload the file to the server
      const formData = new FormData();
      formData.append('file', selectedFile);

      fetch('https://resumeocr-production.up.railway.app/resumetojson/', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response
          setUploading(false);
          setResponseText(data.success ? data.message : data.error);
        })
        .catch(error => {
          setUploading(false);
          setResponseText('An error occurred while uploading the file.');
        });
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button 
			className="text-[0.75rem] hover:shadow-md  active:opacity-80 flex flex-col bg-secondary rounded-xl text-main justify-center items-center"
			id="Assessment"
      onClick={openModal}>
	
			<p>Upload Resume</p>
		</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className=''>
      <div className='justify-end items-end flex'>
        <button onClick={closeModal}>Close Modal</button>
        </div>
        <br />
        <div>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            disabled={uploading}
            />
          {selectedFile && <p>Selected File: {selectedFile.name}</p>}
          {selectedFile && (
            <button onClick={handleUpload} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload Resume'}
            </button>
          )}
          {responseText && (
            <p style={{ color: responseText.includes('success') ? 'green' : 'red' }}>
              {responseText}
            </p>
          )}
        </div>
          </div>
      </Modal>
    </div>
  );
}
