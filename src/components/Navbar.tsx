
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonCustom } from "./ui/button-custom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, signOut } = useAuth();
  const navigate = useNavigate();

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSignOut = () => {
    signOut();
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10",
        scrolled ? "py-3 glass" : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold tracking-tight">
            Find<span className="text-primary">It</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="link-underline font-medium text-sm hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/events" className="link-underline font-medium text-sm hover:text-primary transition-colors">
            Events
          </Link>
          <Link to="/about" className="link-underline font-medium text-sm hover:text-primary transition-colors">
            About
          </Link>
          {isAuthenticated && (
            <Link to="/scrape-manager" className="link-underline font-medium text-sm hover:text-primary transition-colors">
              Scrape Manager
            </Link>
          )}
          {isAuthenticated && (
            <Link to="/create-event" className="link-underline font-medium text-sm hover:text-primary transition-colors">
              Create Event
            </Link>
          )}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <div className="text-sm font-medium">
                {user?.name}
              </div>
              <ButtonCustom 
                variant="ghost" 
                size="sm" 
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <LogOut size={16} />
                Sign Out
              </ButtonCustom>
            </div>
          ) : (
            <>
              <Link to="/sign-in">
                <ButtonCustom variant="ghost" size="sm">
                  Sign In
                </ButtonCustom>
              </Link>
              <Link to="/sign-up">
                <ButtonCustom variant="primary" size="sm">
                  Sign Up
                </ButtonCustom>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
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
            className="transition-transform duration-300"
          >
            {mobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute left-0 right-0 glass py-4 px-6 transition-all duration-300 transform",
          mobileMenuOpen ? "top-full opacity-100" : "-top-[400px] opacity-0"
        )}
      >
        <nav className="flex flex-col space-y-4">
          <Link
            to="/"
            className="py-2 font-medium hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/events"
            className="py-2 font-medium hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Events
          </Link>
          <Link
            to="/about"
            className="py-2 font-medium hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          {isAuthenticated && (
            <Link
              to="/scrape-manager"
              className="py-2 font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Scrape Manager
            </Link>
          )}
          {isAuthenticated && (
            <Link
              to="/create-event"
              className="py-2 font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Create Event
            </Link>
          )}
          
          {isAuthenticated ? (
            <div className="flex items-center pt-2">
              <div className="flex-1 py-2 font-medium">
                {user?.name}
              </div>
              <ButtonCustom
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleSignOut}
              >
                <LogOut size={16} />
                Sign Out
              </ButtonCustom>
            </div>
          ) : (
            <div className="flex space-x-4 pt-2">
              <Link to="/sign-in" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                <ButtonCustom variant="outline" className="w-full">
                  Sign In
                </ButtonCustom>
              </Link>
              <Link to="/sign-up" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                <ButtonCustom variant="primary" className="w-full">
                  Sign Up
                </ButtonCustom>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
