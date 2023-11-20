import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../Styling/Repo.css';
import { FaSearch } from 'react-icons/fa';
import {  useSelector } from "react-redux";

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRepositories, setFilteredRepositories] = useState([]);
   const repositories = useSelector((state) => state.repository.repositories)

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(event.target.value);

    if (term === "") {
      setFilteredRepositories([]);
    } else {
      const filtered = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(term)
      );
      setFilteredRepositories(filtered);
    }
  };

  const highlightText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span className="search-span">
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index}>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <>
      <div data-aos="zoom-in">
        <div className="nav-search">
          <div className="nav-search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Find a repository..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        {searchTerm !== "" && filteredRepositories.length === 0 ? (
          <div className="norepo-found">No repositories found</div>
        ) : (
          <ul className="searchboxrepo-list">
            {filteredRepositories.map((repo) => (
             <li className="searchboxrepo-item" key={repo._id}>
             <Link to={`/repos/${repo._id}`}  style={{ fontSize: '14px' }}>
               {highlightText(repo.name, searchTerm)}
               {repo.name}
             </Link>
           </li>
           
            ))}
          </ul>
        )}

        {/* Conditionally render the search results with a blue background */}
        {filteredRepositories.length > 0 && (
          <div className="searchbox-results">
            <ul>
              {filteredRepositories.map((repo) => (
                <li key={repo._id}>
                  <Link to={`/repos/${repo._id}`}>
                    {highlightText(repo.name, searchTerm)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchBox;
