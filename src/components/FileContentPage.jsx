// export default FileContentPage;
import React, { useState, useEffect } from "react";
import axios from "../helper/axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "../Styling/FileContentPage.css";
import Navbar from "../components/Navbar";
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AOS from 'aos';
import { useDispatch, useSelector } from "react-redux";

import 'aos/dist/aos.css'; // Import AOS CSS for styling

function FileContentPage() {

  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: false,     // Whether the animation should only happen once
  });

const [copied, setCopied] = useState(false);
 const dispatch = useDispatch
 
const fileData = useSelector((state) => state.fileContent.fileData) 
const fileContent = useSelector((state) => state.fileContent.fileData.content)
console.log(fileData)
   
  const handleCopy = () => {
    navigator.clipboard.writeText(fileContent).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false); // Reset copied state to false after 5 seconds
      }, 5000);
    });
  };

  return (
    <>
    <Navbar />
        <div className="file-content-container">
        <div className="file-copy">
          <p className="filecontent-para" data-aos="fade-up">   <FontAwesomeIcon icon={faFile} className="file-content-file"/>{fileData.fileName}</p>
          <div className="copy-button-container">
        <button onClick={handleCopy} data-aos="fade-down">
          {copied ? "Copied!" : "Copy Code"}
        </button>
      </div>
      </div>
          <div className="code-container" data-aos="zoom-in">
            <SyntaxHighlighter language="javascript" style={atomDark}>
              {fileContent}
            </SyntaxHighlighter>
          </div>
        </div>
    </>
  );
}

export default FileContentPage;