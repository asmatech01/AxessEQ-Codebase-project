import React from 'react';
import '../Styling/totalrepo.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS for styling
import { useSelector } from 'react-redux';

function TotalRepo() {
  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: false,     // Whether the animation should only happen once
  });

const repositories = useSelector((state) => state.repository.repositories)

return (
    <div className='totalrepo-name'>
    <div className="totalrepo-container" data-aos="zoom-in">
      <h2><span>AxessEQ </span>Repositories</h2>
      <hr></hr>
      <p>Total Repositories : {repositories.length > 0 ? repositories.length : 0}</p>
    </div>
    </div>
  );
}

export default TotalRepo;
