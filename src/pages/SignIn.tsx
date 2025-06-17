
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn, googleSignIn, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/events");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    
    const success = await signIn(email, password);
    if (success) {
      navigate("/events");
    } else {
      setError("Failed to sign in. Please check your credentials and try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    const success = await googleSignIn();
    if (success) {
      navigate("/events");
    } else {
      setError("Google sign-in failed. Please try again.");
    }
  };
  
  if (isAuthenticated) {
    return null; // Will redirect via useEffect
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md px-8 py-10 mx-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Sign in to continue to FindIt
            </p>
          </div>
          
          {error && (
            <div className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-300 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white"
                placeholder="you@example.com"
                required
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <a href="#" className="text-sm text-primary hover:text-primary/90">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white"
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>
            
            <ButtonCustom
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="w-full py-2"
            >
              Sign In
            </ButtonCustom>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="flex items-center justify-center">
                  <svg
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path
                        fill="#4285F4"
                        d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                      />
                      <path
                        fill="#34A853"
                        d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                      />
                      <path
                        fill="#EA4335"
                        d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                      />
                    </g>
                  </svg>
                  Google
                </div>
              </button>
              
              <button
                type="button"
                className="w-full py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="flex items-center justify-center">
                  <svg
                    className="h-5 w-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  GitHub
                </div>
              </button>
            </div>
          </div>
          
          <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link to="/sign-up" className="font-medium text-primary hover:text-primary/90">
              Sign up
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
