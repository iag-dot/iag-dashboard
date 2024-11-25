import React from 'react';
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Navigate to="/error" />;
  }

  return children;
};

export default PrivateRoute;