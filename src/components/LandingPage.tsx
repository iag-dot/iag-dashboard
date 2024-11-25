import React from 'react';
import { Bell, Settings } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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

      {/* Main Content */}
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
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Analytics</h3>
              <p className="mt-2 text-sm text-gray-500">
                Track your performance metrics and insights in real-time
              </p>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Management</h3>
              <p className="mt-2 text-sm text-gray-500">
                Efficiently manage your resources and assets
              </p>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Reports</h3>
              <p className="mt-2 text-sm text-gray-500">
                Generate comprehensive reports and analytics
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;