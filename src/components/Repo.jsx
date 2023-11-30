import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styling/Repo.css";
import { FaBars, FaSearch } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Repositorylist from "../components/Repositorylist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS for styling
import Swal from "sweetalert2";
import { BallTriangle } from "react-loader-spinner";

import { useSelector, useDispatch } from "react-redux";
import {
  getAllRepository,
  DeleteContent,
  recentlyOpen,
} from "../actions/repository.action";
function Repo({ showNavbar = true }) {
  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: false, // Whether the animation should only happen once
  });

  const [visibleRepositories, setVisibleRepositories] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const repositories = useSelector((state) => state.repository.repositories);
  const loading = useSelector((state => state.repository.loading))
  console.log("here is repository loader" , loading)
  const loadMoreRepositories = () => {
    setVisibleRepositories((prevVisible) => prevVisible + 6);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setVisibleRepositories(6);
  };

  const highlightText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} className="highlighted">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const filteredRepositories =
    repositories && repositories.length > 0
      ? repositories.filter((repo) =>
          repo.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  const openRepository = async (repoId) => {
    try {
      dispatch(recentlyOpen(repoId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteContent = async (repoId) => {
    try {
      dispatch(DeleteContent(repoId));
      console.log("DeleteContent dispatched successfully");
    } catch (error) {
      console.error("Error dispatching DeleteContent", error);
    }
  };

  return (
    <div className="repo-main">
      {showNavbar && <Navbar />}
      <Repositorylist />

      <div className="repo-container">
        <h2 data-aos="zoom-in">Repositories</h2>
        <div className="search">
          <div className="Repo-name">
            <div className="search-container" data-aos="fade-down">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Find a repository..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Link to={"/CreateRepo"} className="repo-new">
              <div className="New-repo" data-aos="zoom-in">
                <FontAwesomeIcon icon={faCodeBranch} className="repo-icon" />
                <p>New</p>
              </div>
            </Link>
          </div>
        </div>
        <ul className="repo-list">
         {loading == true ? (
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
          filteredRepositories && filteredRepositories.length > 0
            ? filteredRepositories.slice(0, visibleRepositories).map((repo) => (
                <li className="repo-item" key={repo._id}>
                  <div data-aos="fade-down" className="trash-delete">
                    <Link
                      className="repo-link"
                      onClick={() => openRepository(repo._id)}
                      to={`/repos/${repo._id}`}
                    >
                      {highlightText(repo.name, searchTerm)}
                    </Link>
                    <span
                      className="a"
                      onClick={() => handleDeleteContent(repo._id)}
                    >
                      Delete Repo
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        className="deleterepo-icon"
                      />
                    </span>
                  </div>
                </li>
              ))
            : (<p>Now repository found</p>)
         )
         }
         
        </ul>
        {visibleRepositories < filteredRepositories.length && (
          <button className="view-more-btn" onClick={loadMoreRepositories}>
            View More
          </button>
        )}
      </div>
    </div>
  );
}

export default Repo;
