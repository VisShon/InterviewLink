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

  const importCSV = async (e) => {
      if(responseText === '') return;
      const candidatesData =  {
          "cgpa": "8.2",
          "college": responseText.college,
          "degree": "BTECH",
          "email": responseText.email,
          "image": responseText.image,
          "name": responseText.name,
          "skillset": responseText.category,
          "status": "TOBEINTERVIEWED",
          "telegramId":  responseText.telegramId?.toString(),
          "track": responseText.category,
        }
      try {
        await addCandidate({
          variables:{
            "input":[...candidatesData]
          }
        })
        console.log(error,data)
      }
      catch(e){
        console.log(e)
      }
    alert("Refresh to Update Candidates")
    return 
  }

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
          setResponseText(data ? data : '');
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

  console.log(responseText, 'responseText')

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
          {selectedFile && (
            <button onClick={handleUpload} disabled={uploading}>
              {uploading ? 'Uploading...' :  'Upload Resume'}
            </button>
          )}
          {responseText !== '' && (
            <>
              <p style={{ color: responseText !== '' ? 'green' : 'red' }}>
              {responseText?.name}
            
              </p>
              <button 
              onClick={importCSV}
              >
                Import
              </button>
            </>
          )}
        </div>
          </div>
      </Modal>
    </div>
  );
}
