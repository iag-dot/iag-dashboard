import { Bell, Settings } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-800">
              Inagiffy
            </div>
            <div className="flex items-center space-x-4">
              <SignedIn>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Bell className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Settings className="w-5 h-5 text-gray-600" />
                </button>
                <UserButton  />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Inagiffy
          </h1>
          <p className="text-xl text-gray-600">
            Your all-in-one dashboard for managing and monitoring your digital assets
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-xl font-semibold mb-4">Analytics</div>
            <p className="text-gray-600">
              Track your performance metrics and insights in real-time
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-xl font-semibold mb-4">Management</div>
            <p className="text-gray-600">
              Efficiently manage your resources and assets
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-xl font-semibold mb-4">Reports</div>
            <p className="text-gray-600">
              Generate comprehensive reports and analytics
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;