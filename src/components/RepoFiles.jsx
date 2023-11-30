import React, { useState, useEffect } from "react";
import axios from "../helper/axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../Styling/RepoFiles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faUpload } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import ProgressBar from "@ramonak/react-progress-bar";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS for styling
import Swal from "sweetalert2";
import { BallTriangle } from "react-loader-spinner";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import {
  getAllFolders,
  uploadFolder,
  deletefolder,
} from "../actions/folders.action";
import { setFileData } from "../actions/fileData";
AOS.init({
  duration: 1000, // Animation duration in milliseconds
  once: false, // Whether the animation should only happen once
});

// function RenderItem({ item }) {

//   let { repoId } = useParams();
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [childContents, setChildContents] = useState([]);
//   console.log(repoId);
//   const toggleFolder = async () => {
//     setIsExpanded(!isExpanded);

//     if (!childContents.length && isExpanded === false) {
//       fetchChildrenData(item.children);
//     }
//   };
//   const fetchChildrenData = async (childIds) => {
//     const childrenData = [];
//     for (const childId of childIds) {
//       console.log("here is child", childIds);
//       try {
//         const childResponse = await axios.get(
//           `/api/get-content/${childId}`
//         );
//         childrenData.push(childResponse.data);
//       } catch (error) {
//         console.error("Error fetching child content:", error);
//       }
//     }
//     setChildContents(childrenData);
//     // console.log(childrenData)
//   };
//   return (
//     <div className="hala" data-aos="fade-down">
//     <li className="code-file-item" data-aos="zoom-in">
//       {item.type === "dir" ? (
//         <div className="folder">
//           <span className="folder-name" onClick={toggleFolder}>
//             {isExpanded ? "📁▼" : "📁"} {item.name}
//           </span>
//           {isExpanded && (
//             <ul className="child-list">
//               {childContents.map((child) => (
//                 <RenderItem key={child._id} item={child} />
//               ))}
//             </ul>
//           )}
//         </div>
//       ) : (
//         <li className="code-file-item" key={item._id}>
//           <a className="code-file-link" href={`/repos/${repoId}/${item.path}`}>
//           <FontAwesomeIcon icon={faFile} className="file-img" />{item.name}
//           </a>
//         </li>
//       )}
//     </li>
//     </div>
//   );
// }

function RepoFiles() {
  let { repoId } = useParams();
  // console.log(repoId)
  const [codeFiles, setCodeFiles] = useState([]);
  const [githubRepoName, setGithubRepoName] = useState("");
  const [repositoryId, setRepositoryId] = useState("");
  const [languageData, setLanguageData] = useState(null); // State to store language data
  const [folderData, setFolderData] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contentData = useSelector((state) => state.content.contents);
  const loading = useSelector((state) => state.content.loading);
  const progressData = useSelector((state) => state.content.progress);
  const uploadStatus = useSelector((state) => state.content.uploading);
  const uploadedStatus = useSelector((state) => state.content.uploaded);
  // console.log("Here is loading", loading);
  // useEffect(() => {
  //   dispatch(getAllFolders());
  // }, [dispatch]);
  useEffect(() => {
    // Find the content associated with the provided repoId
    const repoContent = contentData.find((item) => item._id === repoId);
    if (repoContent) {
      setFolderData(repoContent);
    } else {
      setFolderData([]);
    }
  }, [contentData, repoId]);
  // Function to toggle folder visibility
  const toggleFolder = (folderId) => {
    if (expandedFolders.includes(folderId)) {
      setExpandedFolders(expandedFolders.filter((id) => id !== folderId));
    } else {
      setExpandedFolders([...expandedFolders, folderId]);
    }
  };

  // Function to check if a folder is expanded
  const isFolderExpanded = (folderId) => {
    return expandedFolders.includes(folderId);
  };
  // console.log("here is my folderdata", folderData)
  function renderFolderHierarchy(folder) {
    return (
      <div className="hala">
        <li className="code-file-item">
          <div key={folder._id}>
            <p
              className="folder-name"
              onClick={() => toggleFolder(folder._id)}
              style={{ cursor: "pointer" }}
            >
              {expandedFolders ? "▼📁" : "📁"} {folder.folderName}
            </p>
            {isFolderExpanded(folder._id) && (
              <div>
                {folder.subFolders.length > 0 && (
                  <li>
                    {folder.subFolders.map((subFolder) => (
                      <li key={subFolder._id}>
                        {renderFolderHierarchy(subFolder)}
                      </li>
                    ))}
                  </li>
                )}
                {folder.files.length > 0 && (
                  <li>
                    {folder.files.map((file) => (
                      <li
                        className="code-file-item"
                        key={file._id}
                        onClick={() => dispatch(setFileData(file))} // Dispatch the action with file data
                      >
                        <a
                          className="code-file-link"
                          onClick={() => navigate(`/content/${file._id}`)}
                        >
                          <FontAwesomeIcon icon={faFile} className="file-img" />
                          {file.fileName}
                        </a>
                      </li>
                    ))}
                  </li>
                )}
              </div>
            )}
          </div>
        </li>
      </div>
    );
  }

  // setRepositoryId = repoId
  useEffect(() => {
    if (repoId) {
      fetchLanguageData(repoId); // Fetch language data when the component loads
      // fetchContentData(repoId);
    }
  }, [repoId]);

  const fetchLanguageData = async (repoId) => {
    try {
      const response = await axios.get(
        `/calculateLanguagePercentages/${repoId}`
      );
      setLanguageData(response.data.languagePercentages);
    } catch (error) {
      console.error("Error fetching language data:", error);
    }
  };
  const handleImportButtonClick = async () => {
    try {
      const response = await axios.post("/fetch-repo-contents", {
        repositoryNames: githubRepoName,
        repositoryId: repoId,
      });
      console.log(repoId);
      console.log(response.data);
      // You can add further handling here if needed
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteContent = async () => {
    try {
      dispatch(deletefolder(repoId));
      console.log("DeleteContent dispatched successfully");
    } catch (error) {
      console.error("Error dispatching DeleteContent", error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("zipFile", selectedFile);

    dispatch(uploadFolder(repoId, formData));
  };

  return (
    <>
      <Navbar />
      <div className="repo-files-container">
        <div className="header">
          <h3 data-aos="zoom-in">
            Code Files for : {repoId ? repoId.name : "Loading..."}
          </h3>
          <div>
            <input
              data-aos="fade-up"
              className="github-url-input"
              type="text"
              placeholder="Enter Your repository Name"
              value={githubRepoName}
              onChange={(e) => setGithubRepoName(e.target.value)}
            />
            <div className="buttons-repofile">
              <button
                className="import-button"
                onClick={handleImportButtonClick}
                data-aos="zoom-in"
              >
                Import
              </button>
              <button
                data-aos="zoom-in"
                className="delete-content-button"
                onClick={handleDeleteContent}
              >
                Delete Content
                <span class="trash">
                  <FontAwesomeIcon icon={faTrashAlt} />
                </span>
              </button>
            </div>
          </div>
          {loading  ? (
            // Show loader while fetching folder data
            <div className="loader">
            <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="#4fa94d"
              ariaLabel="ball-triangle-loading"
              wrapperClass={{}}
              wrapperStyle=""
              visible={true}
            />
          </div>
          ) : (
     
     
     <div className="nocode-main">
              {folderData === null ? (
                <p className="nocode-para">Loading...</p>
              ) : 
              folderData.length === 0 ? (
                <div className="">
                <p className="nocode-para">
                  No code files available for this repository.
                </p>
                <div>
                  <h1 className="uploadfile-head">Upload Your Files Here :</h1>
                  <div className="upload-man2">
                  <input type="file" onChange={handleFileChange} className="upload-file"/>
                  <button onClick={handleUpload} className="upload-btn">Upload<FontAwesomeIcon icon={faUpload} className="upload-icon"/></button>        
                  </div>
                </div>
              </div>
              ) : (
                // Render the hierarchy here, you may use a recursive function
                <div>
                  <ul className="code-files-list">
                    {renderFolderHierarchy(folderData)}
                  </ul>
                </div>
              )}
              {/* Add the ProgressBar component with appropriate props */}
              {/* Progress bar should be visible when an upload is in progress */}

              {selectedFile && (
                <h2 className="upload-succes-head">
                  {uploadStatus === true ? "file uploading..." : ""}
                  {uploadedStatus === true ? "file uploaded Succesfully" : ""}
                </h2>
              )}
              {selectedFile && (
                <ProgressBar
                  completed={progressData}
                  height="25px"
                  bgColor="#007bff"
                />
              )}
            </div>
          )}
        </div>
        <div className="code-file2" data-aos="zoom-in">
          <p className="languages-p" data-aos="fade-up">
            Languages :
          </p>
          <ul className="language-names" data-aos="zoom-in">
            {languageData &&
              Object.entries(languageData).map(([language, percentage]) => (
                <li key={language}>
                  {language}: {percentage}%
                </li>
              ))}
          </ul>

          <div className="repofile-side" data-aos="fade-up">
            <Link to={`/commits/${repoId}`}>Commits</Link>
          </div>
          <div className="repofile-side" data-aos="fade-down">
            <Link to={`/contributors/${repoId}`}>Contributor</Link>
          </div>
          <div className="repofile-side" data-aos="fade-up">
            <Link to={`/collaborators/${repoId}`}>Collaborators</Link>
          </div>
          <div className="repofile-side" data-aos="fade-down">
            <Link to={`/code-frequency/${repoId}`}>Code Frequncy</Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default RepoFiles;
