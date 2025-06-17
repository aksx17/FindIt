
import React from "react";
import { Link } from "react-router-dom";
import { ButtonCustom } from "./ui/button-custom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[15%] w-64 h-64 bg-blue-300/20 dark:bg-blue-900/10 rounded-full filter blur-3xl" />
        <div className="absolute top-[40%] right-[10%] w-72 h-72 bg-indigo-300/20 dark:bg-indigo-900/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-[10%] left-[35%] w-80 h-80 bg-purple-300/20 dark:bg-purple-900/10 rounded-full filter blur-3xl" />
      </div>

      <div className="container px-6 py-16 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 rounded-full mb-6">
              Discover · Connect · Participate
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4">
              Discover Events That<br />
              <span className="text-primary">Shape Your Future</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
              Find hackathons, workshops, competitions, and more - all in one place. Stay ahead with real-time updates and never miss an opportunity.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/events">
                <ButtonCustom variant="primary" size="lg" className="font-medium">
                  Explore Events
                </ButtonCustom>
              </Link>
              <Link to="/sign-up">
                <ButtonCustom variant="outline" size="lg" className="font-medium">
                  Create Account
                </ButtonCustom>
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800 bg-gray-200 dark:bg-gray-700" />
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Joined by <span className="font-medium text-gray-900 dark:text-white">5000+</span> students
              </p>
            </div>
          </div>

          <div className="lg:w-1/2 relative animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-xl card-shadow">
              <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Students at hackathon"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Global Tech Hackathon 2023</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Organized by TechCrunch</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-primary/90 text-white rounded-md">
                    Featured
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1.5"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>Dec 15-17, 2023</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1.5"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>San Francisco, CA</span>
                  </div>
                </div>
                <ButtonCustom variant="primary" className="w-full">
                  Register Now
                </ButtonCustom>
              </div>
            </div>

            {/* Floating elements */}
           {/* <div className="absolute -top-6 -right-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg card-shadow animate-float">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-sm font-medium">Participation confirmed</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg card-shadow animate-float" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </div>
                <span className="text-sm font-medium">Registration ending soon</span>
              </div>
            </div>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
