import React from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut } from "@clerk/clerk-react";

function Home() {
  return (
    <div className="text-center">
      <h1 className="display-4">Welcome to CampusFind</h1>
      <p className="lead">Find what you've lost, and report what you've found. Your campus community is here to help.</p>
      <hr className="my-4" />
      <SignedOut>
        <p>Get started by creating an account or signing in.</p>
        <Link className="btn btn-primary btn-lg me-2" to="/sign-up" role="button">Sign Up</Link>
        <Link className="btn btn-secondary btn-lg" to="/sign-in" role="button">Sign In</Link>
      </SignedOut>
      <SignedIn>
        <p>You are signed in. Head to the dashboard to see the latest items.</p>
        <Link className="btn btn-primary btn-lg" to="/dashboard" role="button">Go to Dashboard</Link>
      </SignedIn>
    </div>
  );
}

export default Home;
