import React from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut } from "@clerk/clerk-react";

// You can find sample images on sites like unsplash.com or pexels.com
// For now, we'll use placeholders.
const placeholderImage1 = "https://media.istockphoto.com/id/466715441/photo/passenger-leaving-change-purse-on-seat-of-bus.webp?a=1&b=1&s=612x612&w=0&k=20&c=RWEmr-IiByTLu6WzDdzQOp5qA1iT0DC0_W0OupR9OHs=";
const placeholderImage2 = "https://images.unsplash.com/photo-1669636527162-538cd666d89d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxvc3QlMjBhbmQlMjBmb3VuZHxlbnwwfHwwfHx8MA%3D%3D";
const placeholderImage3 = "https://plus.unsplash.com/premium_photo-1661297433665-870517c1cf6f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bG9zdCUyMGFuZCUyMGZvdW5kfGVufDB8fDB8fHww";

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