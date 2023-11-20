import React, { useState } from 'react';
import axios from "../helper/axios";
import Navbar from "../components/Navbar";
import '../Styling/CreateRepo.css'; // Import your CSS file for styling
import myImage from '../assets/AxessEQ Logo.png';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS for styling
import { useDispatch } from 'react-redux';
import { createRepo } from '../actions/repository.action';
function CreateRepo() {

  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: false,     // Whether the animation should only happen once
  });

const [repoName, setRepoName] = useState('');
const [description, setDescription] = useState('');
const [message, setMessage] = useState('');
const dispatch = useDispatch()
const handleCreateRepo = () => {
  dispatch(createRepo(repoName, description))
    .then(() => {
      setRepoName('');
      setDescription('');
    })
    .catch((error) => {
      console.error('Error creating repository:', error);
    });
};

  return (
    <>
    <Navbar />
    <div className='create-repo-main'>
    <div className="create-repo-container" data-aos="zoom-in">
      <div className='create-logo'>
      <h2 data-aos="fade-up">Create a New Repository</h2>
      <img src={myImage} alt="My Image" data-aos="fade-down"/>
      </div>
      <form className="repo-form">
        <div className="form-group">
          <label htmlFor="repoName" data-aos="fade-up">Repository Name :</label>
          <input data-aos="fade-down"
            type="text"
            id="repoName"
            value={repoName}
            onChange={(e) => setRepoName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
            <label htmlFor="description" data-aos="fade-up">Description  :</label>
            <textarea data-aos="fade-down"
              rows={'5'}
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              
            />
          </div>
          <div className="form-group" id="form-group">
             <button type="button" onClick={handleCreateRepo}>
               Create Repository
             </button>
        </div>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
    </div>
    </>
  );
  }

export default CreateRepo;