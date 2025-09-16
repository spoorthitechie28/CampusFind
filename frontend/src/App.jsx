import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { SignIn, SignUp, SignedIn, SignedOut, UserButton, UserProfile } from "@clerk/clerk-react";

// Import your page components
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ReportItem from './pages/ReportItem';
import Profile from './pages/Profile';
import About from './pages/About';
import Footer from './components/Footer';
import ItemDetails from './pages/ItemDetails'; // <-- 1. IMPORT THE NEW PAGE

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

// Define the custom appearance for Clerk components
const clerkAppearance = {
  elements: {
    formButtonPrimary: 'bg-primary hover:bg-primary-dark',
    card: 'shadow-none border-0',
    rootBox: 'w-full',
    formFieldInput: 'rounded-md focus:ring-2 focus:ring-primary',
  },
};

// A layout component for the auth pages
const AuthLayout = ({ children }) => {
  return (
    <div className="auth-container">
      <div className="auth-image-side">
        <div className="auth-image-text">
          <h2>Welcome to Our Lost and Found Website!</h2>
          <p>We're excited to help you find and recover lost items. Easily report lost belongings, search for found items, and connect with others.</p>
        </div>
      </div>
      <div className="auth-form-side">
        {children}
      </div>
    </div>
  );
};


// Main App component to handle routing
export default function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <AppNavbar />
        <main className="container-fluid mt-4 flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            
            <Route 
              path="/sign-in/*" 
              element={
                <AuthLayout>
                  <SignIn routing="path" path="/sign-in" appearance={clerkAppearance} />
                </AuthLayout>
              } 
            />
            <Route 
              path="/sign-up/*" 
              element={
                <AuthLayout>
                  <SignUp routing="path" path="/sign-up" appearance={clerkAppearance} />
                </AuthLayout>
              } 
            />

            {/* Your other Protected Routes remain the same... */}
            <Route path="/dashboard" element={ <SignedIn> <Dashboard /> </SignedIn> } />
            <Route path="/report" element={ <SignedIn> <ReportItem /> </SignedIn> } />
            <Route path="/profile" element={ <SignedIn> <Profile /> </SignedIn> } />
            <Route path="/user" element={ <SignedIn> <div className="d-flex justify-content-center"><UserProfile /></div> </SignedIn> } />

            {/* --- 2. ADD THE NEW ROUTE FOR ITEM DETAILS --- */}
            <Route path="/item/:itemId" element={ <SignedIn> <ItemDetails /> </SignedIn> } />

          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}