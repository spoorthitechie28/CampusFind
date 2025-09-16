import React from 'react';

// A placeholder image for the about page. You can replace this URL with any other image.
const aboutImageUrl = 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About CampusFind</h1>
        <p className="subtitle">
          The centralized hub for reuniting students and staff with their lost belongings.
        </p>
      </div>

      <div className="about-main-content">
        <div className="about-image-container">
          <img src={aboutImageUrl} alt="University campus" className="about-image" />
        </div>
        <div className="about-text-container">
          <div className="about-card">
            <h2>Our Mission</h2>
            <p>
              Our mission is to create a seamless and efficient digital lost and found system for our college community. No more searching through dusty boxes in administrative offices. With CampusFind, you can report a lost item or post a found item from anywhere, at any time.
            </p>
          </div>
          <div className="about-card">
            <h2>Our Technology</h2>
            <p>
              This project was built to solve a real-world problem on campus and demonstrates a full-stack web application using modern technologies like React for the frontend and Convex for a real-time, secure backend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;