import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// --- UserProfile is now imported from Clerk ---
import { SignIn, SignUp, SignedIn, SignedOut, UserButton, UserProfile } from "@clerk/clerk-react";

// Import your page components
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ReportItem from './pages/ReportItem';
import Profile from './pages/Profile';
import About from './pages/About';

// A simple Navbar component for navigation
function AppNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">CampusFind</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <SignedIn>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/report">Report Item</Link>
              </li>
               <li className="nav-item">
                {/* Changed "Profile" to "My Items" for clarity */}
                <Link className="nav-link" to="/profile">My Items</Link>
              </li>
            </SignedIn>
             <li className="nav-item">
                <Link className="nav-link" to="/about">About Us</Link>
              </li>
          </ul>
          <div className="d-flex">
             <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <Link to="/sign-in" className="btn btn-outline-primary me-2">Sign In</Link>
                <Link to="/sign-up" className="btn btn-primary">Sign Up</Link>
              </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}


// Main App component to handle routing
export default function App() {
  return (
    <BrowserRouter>
      <AppNavbar />
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          
          {/* Clerk's sign-in and sign-up pages */}
          <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
          <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <SignedIn>
                <Dashboard />
              </SignedIn>
            }
          />
          <Route
            path="/report"
            element={
              <SignedIn>
                <ReportItem />
              </SignedIn>
            }
          />
           <Route
            path="/profile"
            element={
              <SignedIn>
                <Profile />
              </SignedIn>
            }
          />
          {/* --- THIS IS THE NEW CODE --- */}
          {/* This route adds the user profile management page */}
          <Route
            path="/user"
            element={
              <SignedIn>
                <div className="d-flex justify-content-center">
                  <UserProfile />
                </div>
              </SignedIn>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}