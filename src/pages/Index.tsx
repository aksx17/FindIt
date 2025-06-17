
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedEvents from "@/components/FeaturedEvents";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose FindIt?</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                We streamline the discovery process, helping you find relevant opportunities without the hassle.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center p-6 hover-scale">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Centralized Platform</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Access events from multiple sources in one place, eliminating the need to check multiple websites.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center p-6 hover-scale">
                <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-600 dark:text-purple-400"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Advanced Filtering</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Filter events by type, date, location, and more to find exactly what you're looking for.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center p-6 hover-scale">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-600 dark:text-green-400"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Calendar Integration</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Seamlessly sync events with your personal calendar and get timely reminders.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <FeaturedEvents />
        
        {/* Stats Section */}
        <section className="py-16 md:py-24">
          <div className="container px-6 mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary mb-2">5000+</p>
                <p className="text-gray-600 dark:text-gray-400">Active Users</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary mb-2">1000+</p>
                <p className="text-gray-600 dark:text-gray-400">Events Listed</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary mb-2">200+</p>
                <p className="text-gray-600 dark:text-gray-400">Partner Organizations</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</p>
                <p className="text-gray-600 dark:text-gray-400">Universities</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container px-6 mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to discover your next opportunity?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have found their path to success with FindIt.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="/events" 
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-medium transition-colors"
              >
                Explore Events
              </a>
              <a 
                href="/sign-up" 
                className="bg-transparent border border-white text-white hover:bg-white/10 px-8 py-3 rounded-full font-medium transition-colors"
              >
                Create Account
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
