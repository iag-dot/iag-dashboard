import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from "@clerk/clerk-react";
import { Bell, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BeehiivClient } from "@beehiiv/sdk";

// Landing Page Component
const LandingPage = () => {
  const { isSignedIn } = useAuth();
  
  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">Inagiffy</span>
            </div>
            <div className="flex items-center space-x-4">
              <SignedIn>
                <>
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <Bell size={20} />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <Settings size={20} />
                  </button>
                  <UserButton afterSignOutUrl="/" />
                </>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to Inagiffy
          </h1>
          <p className="mt-3 text-xl text-gray-500 sm:mt-5">
            Your all-in-one dashboard for managing and monitoring your digital assets
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Analytics</h3>
              <p className="mt-2 text-sm text-gray-500">
                Track your performance metrics and insights in real-time
              </p>
            </div>
          </Card>

          <Card className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Management</h3>
              <p className="mt-2 text-sm text-gray-500">
                Efficiently manage your resources and assets
              </p>
            </div>
          </Card>

          <Card className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Reports</h3>
              <p className="mt-2 text-sm text-gray-500">
                Generate comprehensive reports and analytics
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

// Internal Dashboard Component
const InternalDashboard = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/');
    }
  }, [isSignedIn, navigate]);

  const client = new BeehiivClient({ 
    token: "pzJIPrZLUYE85JRNGe3jpB1WnYyEQTPyjdNaCLKQX2fWfbukeLKakNohTh4jcAhB" 
  });

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch(
          "/api/v2/publications/pub_9ae8634a-2526-473c-92ce-afb5320045cc/bulk_subscription_updates",
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${client.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch publications:", error);
      }
    };

    fetchPublications();
  }, []);

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">Inagiffy Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Bell size={20} />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Settings size={20} />
              </button>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-5 max-md:flex-col">
          <Card className="w-1/4 h-40 p-4 max-md:w-5/6">
            <div className="flex items-center justify-between h-8 mb-7">
              <CardHeader>
                <CardTitle className="font-light text-xl">Deploy Count</CardTitle>
              </CardHeader>
              <img src="/api/placeholder/36/36" alt="rocket icon" className="w-9" />
            </div>
            <CardContent>
              <p className="text-5xl">5324</p>
            </CardContent>
          </Card>

          <Card className="w-1/4 h-40 p-4 max-md:w-5/6">
            <div className="flex items-center justify-between h-8 mb-7">
              <CardHeader>
                <CardTitle className="font-light text-xl">Open Rate</CardTitle>
              </CardHeader>
              <img src="/api/placeholder/36/36" alt="open icon" className="w-9" />
            </div>
            <CardContent>
              <p className="text-5xl">3214</p>
            </CardContent>
          </Card>

          <Card className="w-1/4 h-40 p-4 max-md:w-5/6">
            <div className="flex items-center justify-between h-8 mb-7">
              <CardHeader>
                <CardTitle className="font-light text-xl">Click Rate</CardTitle>
              </CardHeader>
              <img src="/api/placeholder/36/36" alt="click icon" className="w-9" />
            </div>
            <CardContent>
              <p className="text-5xl">432</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

// PrivateRoute Component
const PrivateRoute = ({ children }) => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/');
    }
  }, [isSignedIn, navigate]);

  return isSignedIn ? children : null;
};

// Error Component
const Error = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900">Error</h1>
      <p className="mt-2 text-gray-600">Something went wrong. Please try again.</p>
    </div>
  </div>
);

// Main App Component
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <InternalDashboard />
            </PrivateRoute>
          } 
        />
        <Route path="/error" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;