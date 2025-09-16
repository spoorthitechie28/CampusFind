import React from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut } from "@clerk/clerk-react";

// You can find sample images on sites like unsplash.com or pexels.com
// For now, we'll use placeholders.
const placeholderImage1 = "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
const placeholderImage2 = "https://images.pexels.com/photos/326461/pexels-photo-326461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
const placeholderImage3 = "https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

function Home() {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Find & Recover<br />
            <span className="highlight-text">With Ease</span>
          </h1>
          <p>Experience effortless recovery with our dedicated lost and found service.</p>
        </div>
        <div className="hero-actions">
          <SignedIn>
            <Link to="/dashboard" className="hero-button lost-button">Lost</Link>
            <Link to="/dashboard" className="hero-button found-button">Found</Link>
          </SignedIn>
          <SignedOut>
            <Link to="/sign-in" className="hero-button lost-button">Lost</Link>
            <Link to="/sign-in" className="hero-button found-button">Found</Link>
          </SignedOut>
          <div className="hero-images">
            <img src={placeholderImage1} alt="Lost item 1" className="hero-img img1" />
            <img src={placeholderImage2} alt="Lost item 2" className="hero-img img2" />
            <img src={placeholderImage3} alt="Lost item 3" className="hero-img img3" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;