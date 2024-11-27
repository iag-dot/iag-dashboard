import { useAuth } from "@clerk/clerk-react";
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();
  
  // Add loading state check
  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  // Redirect to sign-in if user is not authenticated
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default PrivateRoute;