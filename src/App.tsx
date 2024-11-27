import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignIn } from '@clerk/clerk-react';
import EnhancedDashboard from './components/EnhancedDashboard';
import LandingPage from './components/LandingPage';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public route - Landing Page */}
        <Route 
          path="/" 
          element={
            <>
              <SignedIn>
                <Navigate to="/dashboard" replace />
              </SignedIn>
              <SignedOut>
                <LandingPage />
              </SignedOut>
            </>
          } 
        />

        {/* Auth route - Sign In */}
        <Route
          path="/sign-in/*"
          element={
            <SignedOut>
              <SignIn routing="path" path="/sign-in" />
            </SignedOut>
          }
        />

        {/* Protected route - Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <EnhancedDashboard />
            </PrivateRoute>
          }
        />

        {/* Catch all - redirect to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;