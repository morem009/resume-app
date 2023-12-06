import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ResumeForm = () => {
  const [resumeId, setResumeId] = useState('');
  const [resumeName, setResumeName] = useState('');
  const [resumeDetails, setResumeDetails] = useState(null);
  const [newResume, setNewResume] = useState({
    firstName: '',
    lastName: '',
    currentJobTitle: '',
    currentJobDescription: '',
    currentJobCompany: '',
  });

  const handleRetrieveByIdClick = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/getResumeById/${resumeId}`);
      
      // Checking if response is an object (single record) and convert it to an array
      const resumeDetailsArray = Array.isArray(response.data) ? response.data : [response.data];

      setResumeDetails(resumeDetailsArray);
    } catch (error) {
      console.error('Error retrieving resume details by ID:', error.response?.data || error.message);
      setResumeDetails([]);
    }
  };

  const handleRetrieveByNameClick = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/getResumeByName/${encodeURIComponent(resumeName)}`);
  
      // Check if the user has entered a name
      if (resumeName.trim() !== '' && response.data.length === 0) {
        // Display the message only when the user has entered a name and no matching resumes are found
        setResumeDetails([]);
      } else {
        // Display the actual resume details
        setResumeDetails(response.data);
      }
    } catch (error) {
      console.error('Error retrieving resume details by name:', error.response?.data || error.message);
      setResumeDetails([]);
    }
  };
  

  const handleAddResumeClick = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/uploadResumeDetails', newResume);
      setNewResume({
        firstName: '',
        lastName: '',
        currentJobTitle: '',
        currentJobDescription: '',
        currentJobCompany: '',
      });
      setResumeDetails(response.data);
      notifySuccess('Resume details have been added successfully!');
    } catch (error) {
      console.error('Error adding new resume:', error.response?.data || error.message);
      setResumeDetails(null);
      notifyError('Failed to add resume details. Please try again.');
    }
  };

  const notifySuccess = (message) => {
    toast.success(message, { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });
  };
  const notifyError = (message) => {
    toast.error(message, { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });
  };

  const handleClearClick = () => {
    setResumeId('');
    setResumeName('');
    setNewResume({
      firstName: '',
      lastName: '',
      currentJobTitle: '',
      currentJobDescription: '',
      currentJobCompany: '',
    });
    setResumeDetails(null);
  };

  const renderResumeDetails = () => {
    if (!resumeDetails || resumeDetails.length === 0) {
      return resumeId.trim() !== '' ? <div>No matching resumes found.</div> : null;
    }
  
    if (resumeDetails[0]) {
        return (
          <Card>
            <Card.Body>
              <Card.Title>Resume Details</Card.Title>
              <Card.Text>
                <strong>ID:</strong> {resumeDetails[0].id}
                <br />
                <strong>Name:</strong> {`${resumeDetails[0].firstName} ${resumeDetails[0].lastName}`}
                <br />
                <strong>Current Job Title:</strong> {resumeDetails[0].currentJobTitle}
                <br />
                <strong>Current Job Description:</strong> {resumeDetails[0].currentJobDescription}
                <br />
                <strong>Current Job Company:</strong> {resumeDetails[0].currentJobCompany}
              </Card.Text>
            </Card.Body>
          </Card>
        );
      }
      return null;
    };
  return (
    <div className="mt-4">
      <ToastContainer />
      <Form>
        <Form.Group controlId="formResumeId">
          <Form.Label>Resume ID</Form.Label>
          <Form.Control type="text" value={resumeId} onChange={(e) => setResumeId(e.target.value)} />
        </Form.Group>
        <Button variant="primary" onClick={handleRetrieveByIdClick}>
          Retrieve Resume Details by ID
        </Button>
      </Form>

      <hr className="my-4" />
      <Form>
        <Form.Group controlId="formResumeName">
          <Form.Label>Resume Name</Form.Label>
          <Form.Control type="text" value={resumeName} onChange={(e) => setResumeName(e.target.value)} />
        </Form.Group>
        <Button variant="primary" onClick={handleRetrieveByNameClick}>
          Retrieve Resume Details by Name
        </Button>
      </Form>

      <hr className="my-4" />

      <Form>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={newResume.firstName}
            onChange={(e) => setNewResume({ ...newResume, firstName: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={newResume.lastName}
            onChange={(e) => setNewResume({ ...newResume, lastName: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formCurrentJobTitle">
          <Form.Label>Current Job Title</Form.Label>
          <Form.Control
            type="text"
            value={newResume.currentJobTitle}
            onChange={(e) => setNewResume({ ...newResume, currentJobTitle: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formCurrentJobDescription">
          <Form.Label>Current Job Description</Form.Label>
          <Form.Control
            type="text"
            value={newResume.currentJobDescription}
            onChange={(e) => setNewResume({ ...newResume, currentJobDescription: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formCurrentJobCompany">
          <Form.Label>Current Job Company</Form.Label>
          <Form.Control
            type="text"
            value={newResume.currentJobCompany}
            onChange={(e) => setNewResume({ ...newResume, currentJobCompany: e.target.value })}
          />
        </Form.Group>
        <Button variant="success" onClick={handleAddResumeClick}>
          Add New Resume
        </Button>
      </Form>

      <hr className="my-4" />

      {renderResumeDetails()}

      <Button variant="secondary" onClick={handleClearClick} className="mt-4">
        Clear
      </Button>
    </div>
  );
};

export default ResumeForm;
