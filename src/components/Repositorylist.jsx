import React, { useState, useEffect } from "react";
import "../Styling/Repositorylist.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS for styling
import { useSelector, useDispatch } from "react-redux";
import { recentlyOpen } from "../actions/repository.action";

function RecentlyOpenedRepos() {
  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: false, // Whether the animation should only happen once
  });

  const dispatch = useDispatch();
  const recentlyOpenedRepos = useSelector(
    (state) => state.recently.recentlyOpenedRepos
  );

  const openRepository = async (repoId) => {
    try {
      // Make a POST request to the API route for opening a repository
      dispatch(recentlyOpen(repoId));
      // Optionally, you can refresh the repository list after opening to reflect the changes
      // FetchRepositories(); // Assuming you have a fetchRepositories function
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Repositorylist-maini">
      <h2 data-aos="zoom-in">Recently Opened Repositories :</h2>
      <ul data-aos="fade-up">
        {recentlyOpenedRepos.map((repo) => (
          <li key={repo._id}>
            <Link
              onClick={() => openRepository(repo._id)}
              to={`/repos/${repo._id}`}
            >
              {repo.name}
            </Link>
            <FontAwesomeIcon icon={faClock} size="2x" className="recent-icon" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentlyOpenedRepos;
